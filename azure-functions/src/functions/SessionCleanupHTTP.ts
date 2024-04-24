import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { BlobServiceClient } from "@azure/storage-blob";
import { PrismaClient } from "@prisma/client";

// Handler function to clean up data for a user based on uuid
const sessionCleanupHTTP: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log("Session cleanup function is running.");

    // Retrieve uuid from query parameters or body
    const uuid = request.query.get("uuid");
    if (!uuid) {
      // 'uuid' is not provided, return a failure response
      return {
        status: 400, // Bad Request status code
        body: "Failure: uuid query parameter is required.",
      };
    }

    const prisma = new PrismaClient();

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

        context.res = {
            status: 200,
            body: `Cleared all data for user UUID: ${uuid}`
        };
    } catch (error) {
        context.log(`Error deleting data for user UUID: ${uuid}. Error: ${error}`);
        context.res = {
            status: 500,
            body: `Error processing your request: ${error.message}`
        };
    } finally {
        await prisma.$disconnect();
    }

    context.log("Session cleanup function completed.");
};

export default sessionCleanupHTTP;
