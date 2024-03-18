import { InvocationContext } from "@azure/functions";
import { BlobServiceClient, ContainerSASPermissions, generateBlobSASQueryParameters, StorageSharedKeyCredential } from "@azure/storage-blob";
import { PrismaClient } from "@prisma/client";

async function SessionCleanup(context: InvocationContext): Promise<void> {
  context.log("Session cleanup function is running.");

  // Retrieve userUUID from session storage
  const userUUID: string | null = sessionStorage.getItem("userUUID");

  if (userUUID === null) {
    context.log("User UUID not found in session storage.");
  } else {
    
    const prisma = new PrismaClient();

    try {
      // Clear SQL Database for the specified userUUID
      await prisma.mp3Metadata.deleteMany({
        where: {
          userUUID: userUUID,
        },
      });

      // Generate SAS token for blob deletion
      const sasToken = generateSasToken(userUUID);

      // Delete blobs from Blob Storage for the specified userUUID
      await deleteBlobs(userUUID, sasToken);

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

// Function to generate SAS token for blob deletion
function generateSasToken(containerName: string): string {
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || "";
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || "";
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

  const permissions = ContainerSASPermissions.parse("racwd"); // Permissions as needed
  const startsOn = new Date();
  const expiresOn = new Date(startsOn.valueOf() + 3600 * 1000); // Token expiration

  return generateBlobSASQueryParameters({
    containerName,
    permissions,
    startsOn,
    expiresOn,
  }, sharedKeyCredential).toString();
}

// Function to delete blobs from Blob Storage
async function deleteBlobs(containerName: string, sasToken: string): Promise<void> {
  const blobServiceClient = new BlobServiceClient(`https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net${sasToken}`);

  const containerClient = blobServiceClient.getContainerClient(containerName);

  if (await containerClient.exists()) {
    // Delete all blobs in the container
    for await (const blob of containerClient.listBlobsFlat()) {
      const blobClient = containerClient.getBlobClient(blob.name);
      await blobClient.delete();
    }
  }
}

export { SessionCleanup };
