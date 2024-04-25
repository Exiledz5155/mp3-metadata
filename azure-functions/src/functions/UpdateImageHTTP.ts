import {
  app,
  InvocationContext,
  HttpRequest,
  HttpResponseInit,
} from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import * as crypto from "crypto";
import * as fileType from "file-type";
import { PrismaClient } from "@prisma/client";

interface UIReqBody {
  file: Buffer;
  userUUID: string;
  songIDs: number[];
}

export async function UpdateImageHTTP(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  if (!request.body) {
    return {
      status: 400,
      body: JSON.stringify({ error: "Request body is empty" }),
      headers: { "Content-Type": "application/json" },
    };
  }

  // Parse the request body
  const body = (await request.json()) as Partial<UIReqBody>;
  if (
    !body.file ||
    !body.userUUID ||
    !body.songIDs ||
    body.songIDs.length === 0
  ) {
    return {
      status: 400,
      body: JSON.stringify({ error: "Missing parameters" }),
      headers: { "Content-Type": "application/json" },
    };
  }

  const { file, userUUID, songIDs } = body;
  const fileBuffer = new Uint8Array(file);

  // Initialize Azure Blob Service Client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env["AzureWebJobsStorage"]
  );
  const containerName = "imagecontainer";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Determine the image type (JPEG or PNG)
  const imageType = await fileType.fromBuffer(fileBuffer);
  let imageExtension = "";

  if (imageType?.mime === "image/jpeg") {
    imageExtension = ".jpg";
  } else if (imageType?.mime === "image/png") {
    imageExtension = ".png";
  } else {
    return {
      status: 400,
      body: "Unsupported image format.",
    };
  }

  // Hash the image data
  const hash = crypto.createHash("sha256");
  hash.update(file);
  const imageHash = hash.digest("hex");

  // Check if the image already exists
  const imageFileName = `${imageHash}${imageExtension}`;
  const blobName = `${userUUID}/${imageFileName}`;
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  try {
    const exists = await blockBlobClient.exists();
    context.log(`Image exists: ${exists}`);

    if (!exists) {
      // Upload the image to the container if it doesn't exist
      await blockBlobClient.upload(fileBuffer, fileBuffer.length);
      context.log(`Image uploaded successfully: ${blobName}`);
    } else {
      context.log(`Image already exists: ${blobName}`);
    }
  } catch (error) {
    context.log(`Error checking or uploading image: ${error.message}`);
    return {
      status: 500,
      body: JSON.stringify({
        error: "Failure: An error occurred while uploading the image.",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  // Update the songs in the database
  const prisma = new PrismaClient();
  try {
    await prisma.mp3File.updateMany({
      where: {
        id: { in: songIDs },
        session: {
          id: userUUID,
        },
      },
      data: { image: blockBlobClient.url },
    });

    return {
      status: 200,
      body: "Image updated successfully.",
    };
  } catch (error) {
    context.log(`Database update failed: ${error.message}`);
    return {
      status: 500,
      body: JSON.stringify({
        error: "Failure: An error occurred while updating the database.",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } finally {
    // Disconnect from Prisma after we are done
    await prisma.$disconnect();
  }
}

app.http("UpdateImageHTTP", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: UpdateImageHTTP,
});
