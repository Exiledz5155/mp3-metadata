import {
  app,
  HttpRequest,
  InvocationContext,
  HttpResponseInit,
} from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { PrismaClient } from "@prisma/client";

async function RemoveHTTP(
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

  const prisma = new PrismaClient();
  // const blobServiceClient = BlobServiceClient.fromConnectionString(
  //   process.env["AzureWebJobsStorage"]!
  // );

  try {
    // Find the files in the database
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
      try {
        const deletedFile = await prisma.mp3File.delete({
          where: { id: file.id },
        });
        console.log("Deleted file:", deletedFile);
      } catch (error) {
        console.error(
          "Failed to delete file with id:",
          file.id,
          "Error:",
          error
        );
      }
    }

    // // Delete files from blob storage and database
    // for (const file of files) {
    //   const pathSegments = file.filePath.split("/");
    //   const containerName = pathSegments[0];
    //   const blobPath = pathSegments.slice(1).join("/");

    //   const blockBlobClient = blobServiceClient
    //     .getContainerClient(containerName)
    //     .getBlockBlobClient(blobPath);

    //   await blockBlobClient.delete();

    //   await prisma.mp3File.delete({
    //     where: { id: file.id },
    //   });
    // }

    return {
      status: 200,
      body: "Success: Files removed successfully.",
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

app.http("RemoveHTTP", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: RemoveHTTP,
});
