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

  // Initialize Azure Blob Service Client
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING || ""
  );
  const containerName = "imagecontainer";
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Determine the image type (JPEG or PNG)
  const imageType = await fileType.fromBuffer(file);
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
  const exists = await blockBlobClient.exists();

  if (!exists) {
    // Upload the image to the container if it doesn't exist
    await blockBlobClient.upload(file, file.length);
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
