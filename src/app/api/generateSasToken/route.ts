// src/app/api/generateSasToken/route.ts
import { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, ContainerSASPermissions } from '@azure/storage-blob';

export async function GET() {
    // Setup for Azure Storage and SAS token generation
    const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || '';
    const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || '';
    const containerName = "test"; //what container file will be uploaded to // each uuid should probably get their own container
    const blobName = "test.mp3"; //name of file within container // should probably match file name of whats being uploaded?

    const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING || '');
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const sasToken = generateBlobSASQueryParameters({
        containerName,
        blobName,
        permissions: ContainerSASPermissions.parse("racwd"), // Permissions as needed
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // Token expiration
    }, sharedKeyCredential).toString();

    console.log("Generated Blob URL:", blockBlobClient.url); //logging. DELETE ME
    console.log("Generated SAS Token:", sasToken);


    // Return the SAS token using the Response.json pattern
    return Response.json({ blobUrl: containerClient.url, sasToken });
}
