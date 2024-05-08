import { BlobServiceClient, RestError } from "@azure/storage-blob"; // Added RestError for specific error handling
import { PrismaClient } from "@prisma/client";
import { app, Timer, InvocationContext } from "@azure/functions";
const { subDays } = require("date-fns");

export async function sessionTimer(
  myTimer: Timer,
  context: InvocationContext
): Promise<void> {
  context.log("Timer activated");
  const prisma = new PrismaClient();

  try {
    context.log("Entered Try Block Session Timer");
    const oneDayOld = subDays(new Date(), 1);
    const expiredSessions = await prisma.session.findMany({
      where: {
        createdAt: {
          lt: oneDayOld, // 'lt' stands for 'less than'
        },
      },
      select: {
        id: true, // Only fetch the id of the session
      },
    });

    const deletePromises = expiredSessions.map((session) =>
      prisma.session.delete({
        where: {
          id: session.id,
        },
      })
    );
    // START OF BLOB DELETION
    const blobServiceClient = BlobServiceClient.fromConnectionString(
      process.env["AzureWebJobsStorage"]!
    );
    const containerClient =
      blobServiceClient.getContainerClient("mp3container");
    if (await containerClient.exists()) {
      const operationPromises = expiredSessions.map(async (session) => {
        const sessionId = session.id;
        const blobs = containerClient.listBlobsFlat({
          prefix: `${sessionId}/`,
        });
        for await (const blob of blobs) {
          const blobClient = containerClient.getBlobClient(blob.name);
          await blobClient.delete();
        }
        return {
          status: 200,
          body: `Cleared all data for user UUID: ${sessionId}`,
        };
      });
    }
  } catch (error) {
    // Catching specific errors and logging them
    if (error instanceof RestError) {
      context.log("Error occurred during Blob deletion:", error.message);
    } else {
      context.log("Error occurred:", error);
    }
  } finally {
    // Ensuring proper cleanup of Prisma client
    await prisma.$disconnect();
  }
}

app.timer("sessionTimer", {
  schedule: "0 0 0 * * *",
  handler: sessionTimer,
});
