import { app, InvocationContext } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { PrismaClient } from "@prisma/client";

// Handler function to clean up data for a user based on userUUID
async function SessionCleanup(
  context: InvocationContext
): Promise<void> {
  context.log("Session cleanup function is running.");

  // Retrieve userUUID from session storage
  const userUUID: string | null = sessionStorage.getItem("userUUID");

  if (userUUID === null) {
    context.log("User UUID not found in session storage.");
  } else {
    // Initialize Prisma
    const prisma = new PrismaClient();

    try {
      // Clear SQL Database for the specified userUUID
      await prisma.mp3Metadata.deleteMany({
        where: {
          userUUID: userUUID,
        },
      });

      // Clear Blob Storage for the specified userUUID
      const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
      const containerClient = blobServiceClient.getContainerClient(userUUID);

      if (await containerClient.exists()) {
        // Delete all blobs in the container
        for await (const blob of containerClient.listBlobsFlat()) {
          const blobClient = containerClient.getBlobClient(blob.name);
          await blobClient.delete();
        }

        // Delete the container itself
        // await containerClient.delete(); (THIS IS HOW WE CAN COMPLETELY DELETE EVERYTHING. DONT UNCOMMENT)
      }

      context.log(`Cleared data for user UUID: ${userUUID}`);
    } catch (error) {
      context.log(`Error deleting data for user UUID: ${userUUID}. Error: ${error}`);
    } finally {
      // Disconnect from Prisma
      await prisma.$disconnect();
    }
  }

  context.log("Session cleanup function completed.");
}

// Register the Timer trigger with the Azure Functions app
app.timer("SessionCleanup", {
  schedule: "0 0 */6 * * *", // Runs every 6 hours (adjust the cron expression as needed)
  direction: "in", // The function is triggered by an input
  timezone: "UTC", // Adjust the timezone as needed
  callback: SessionCleanup,
});
