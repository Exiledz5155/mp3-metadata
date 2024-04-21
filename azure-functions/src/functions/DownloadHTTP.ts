import {
  app,
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
} from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { PrismaClient } from "@prisma/client";
import * as nodeID3 from "node-id3";
import axios from "axios";
import * as path from "path";
import * as JSZip from "jszip";

// Helper function to convert a stream to a buffer
function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on("data", (chunk: Buffer) => chunks.push(chunk));
    stream.on("end", () => resolve(Buffer.concat(chunks)));
    stream.on("error", reject);
  });
}

async function getImageAsBuffer(imageUrl: string): Promise<Buffer> {
  const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
  return Buffer.from(response.data);
}

async function updateMP3Metadata(
  filePath: string,
  metadata: any
): Promise<Buffer> {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env["AzureWebJobsStorage"]!
  );

  // Split the filePath to remove the container name
  const pathSegments = filePath.split("/");
  const containerName = pathSegments[0]; // The first part is the container name
  const blobPath = pathSegments.slice(1).join("/"); // Join the rest to form the blob path

  const blockBlobClient = blobServiceClient
    .getContainerClient(containerName)
    .getBlockBlobClient(blobPath);

  if (metadata.image) {
    const imageBuffer = await getImageAsBuffer(metadata.image);
    metadata.image = {
      mime: "image/jpeg",
      type: { id: 3, name: "front cover" },
      description: "Cover image",
      imageBuffer: imageBuffer,
    };
  }

  try {
    const downloadResponse = await blockBlobClient.download(0);
    const originalMp3Buffer = await streamToBuffer(
      downloadResponse.readableStreamBody!
    );
    const success = nodeID3.update(metadata, originalMp3Buffer);
    if (!success) {
      throw new Error("Failed to update ID3 tags.");
    }
    return success; // Return the updated MP3 buffer
  } catch (error) {
    console.error("Error updating MP3 metadata:", error.message);
    throw error;
  }
}

async function DownloadHTTP(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  const uuid = request.query.get("uuid");
  const ids = request.query.get("ids");

  if (!uuid || !ids) {
    return {
      status: 400,
      body: "Failure: UUID and ID list query parameters are required.",
    };
  }

  const fileIds = ids
    ? ids
        .split(",")
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id))
    : [];

  const zip = new JSZip();
  const prisma = new PrismaClient();

  try {
    const files = await prisma.mp3File.findMany({
      where: { id: { in: fileIds } },
    });

    if (files.length === 0) {
      return {
        status: 404,
        body: "Failure: No files found with the specified IDs.",
      };
    }

    for (const file of files) {
      const metadata = {
        title: file.title,
        artist: file.artist,
        albumTitle: file.albumTitle,
        year: file.year,
        image: file.image,
        albumArtist: file.albumArtist,
        trackNumber: file.trackNumber,
        genre: file.genre,
        duration: file.duration,
      };
      context.log(
        `Updating metadata: ${JSON.stringify(metadata, null, 2)} for file ${
          file.id
        }`
      );
      const buffer = await updateMP3Metadata(file.filePath, metadata);
      zip.file(path.basename(file.filePath), buffer);
    }

    const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
    return {
      status: 200,
      body: zipBuffer,
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="YourMp3s.zip"`, //change zip name to what we want later.
      },
    };
  } catch (error) {
    context.log(`An error occurred: ${error.message}`);
    return {
      status: 500,
      body: "Failure: An internal server error occurred.",
    };
  } finally {
    await prisma.$disconnect();
  }
}

app.http("DownloadHTTP", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: DownloadHTTP,
});
