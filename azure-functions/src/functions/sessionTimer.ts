import { BlobServiceClient } from "@azure/storage-blob";
import { PrismaClient } from "@prisma/client";
import { app, Timer, InvocationContext } from "@azure/functions";

const connectionString = process.env["AZURE_STORAGE_CONNECTION_STRING"]; // Ensure your connection string is correctly configured
const containerName = "your-container-name"; // Specify your container name
const retentionPeriodDays = 30; // Blobs older than this will be deleted

export async function sessionTimer(myTimer: Timer, context: InvocationContext): Promise<void> {
    context.log('Timer function processed request.');

    // Blob cleanup logic
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const today = new Date();

    let blobsDeleted = 0;

    for await (const blob of containerClient.listBlobsFlat()) {
        const blobClient = containerClient.getBlobClient(blob.name);
        const properties = await blobClient.getProperties();

        const lastModified = properties.lastModified;
        const ageInDays = (today.getTime() - lastModified.getTime()) / (1000 * 60 * 60 * 24);

        if (ageInDays > retentionPeriodDays) {
            await blobClient.delete();
            blobsDeleted++;
            context.log(`Deleted blob: ${blob.name}`);
        }
    }

    context.log(`Total blobs deleted: ${blobsDeleted}`);
}

// Register the timer function with Azure
app.timer('sessionTimer', {
    schedule: '0 0 0 * * *',
    handler: sessionTimer
});
