// src/app/api/generateSasToken/route.ts
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
} from "@azure/storage-blob";

export async function GET(request: Request) {
  // Takes in params (filename) from API call creates a const for later use
  const url = new URL(request.url);
  const blobName = url.searchParams.get("fileName") || "defaultFileName.mp3";

  // Setup for Azure Storage and SAS token generation
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || "";
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || "";
  const containerName = url.searchParams.get("container") || "mp3container"; //what container file will be uploaded to
  // each uuid should get their own folder in the same container

  // Authentication to Azure Storage Service
  const sharedKeyCredential = new StorageSharedKeyCredential(
    accountName,
    accountKey
  );

  // Authentication to Blob service operations
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    process.env.AZURE_STORAGE_CONNECTION_STRING || ""
  );

  // Creates container client using specified container name
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Creates blob with specified blobName (from API params earlier)
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Generates sasToken, which is a final verification step
  const sasToken = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: ContainerSASPermissions.parse("racwd"), // Permissions as needed
      startsOn: new Date(),
      expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // Token expiration
    },
    sharedKeyCredential
  ).toString();

  // Debugging
  // console.log("Generated Blob URL:", blockBlobClient.url); //logging. DELETE ME
  // console.log("Generated SAS Token:", sasToken);

  // Return the SAS token using the Response.json pattern
  return Response.json({ blobUrl: blockBlobClient.url, sasToken });
}
