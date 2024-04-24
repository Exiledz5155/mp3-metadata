import { AzureFunction, Context } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { PrismaClient } from "@prisma/client";

const sessionCleanupTimer: AzureFunction = async function (context: Context): Promise<void> {
    context.log("Session cleanup function is running.");


    const prisma = new PrismaClient();
    const uuid = request.query.get("uuid");

    if (!uuid) {
      return {
        status: 400, // Bad Request status code
        body: "Failure: uuid query parameter is required.",
      };
    }


    try {
        await prisma.mp3Metadata.deleteMany({
            where: {
                uuid: uuid,
            },
        });

        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
        const containerClient = blobServiceClient.getContainerClient(uuid);

        if (await containerClient.exists()) {
            for await (const blob of containerClient.listBlobsFlat()) {
                const blobClient = containerClient.getBlobClient(blob.name);
                await blobClient.delete();
            }
        }

        context.log(`Cleared data for user UUID: ${uuid}`);
    } catch (error) {
        context.log(`Error deleting data for user UUID: ${uuid}. Error: ${error}`);
    } finally {
        await prisma.$disconnect();
    }

    context.log("Session cleanup function completed.");
};

export default sessionCleanupTimer;
