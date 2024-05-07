import { BlobServiceClient } from "@azure/storage-blob";
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
    const thirtyDaysAgo = subDays(new Date(), 30);
    const expiredSessions = await prisma.session.findMany({
      where: {
        createdAt: {
          lt: thirtyDaysAgo, // 'lt' stands for 'less than'
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
          prefix: `${sessionId}/`, // Ensure the prefix ends with a '/' to denote a folder
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
  } catch {
    context.log("catch block of session timer");
  }
}

app.timer("sessionTimer", {
  schedule: "0 0 0 * * *",
  handler: sessionTimer,
});
