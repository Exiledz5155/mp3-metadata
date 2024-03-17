import { BlobServiceClient, StorageSharedKeyCredential, generateBlobSASQueryParameters, ContainerSASPermissions, } from "@azure/storage-blob";


export async function GET(request: Request) {
  // Extract fileName and userUUID from the query parameters
  const url = new URL(request.url);
  const blobName = url.searchParams.get("fileName") || "defaultFileName.mp3";

  // Azure Storage setup
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || "";
  const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || "";
  const containerName = "mp3container"; // Container where files are stored


  // Authenticate with Azure Storage
  const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
  const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING || "");
  const containerClient = blobServiceClient.getContainerClient(containerName);

  // Specify the blob to download
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);

  // Generate a SAS token for downloading
  const sasToken = generateBlobSASQueryParameters({
    containerName,
    blobName,
    permissions: ContainerSASPermissions.parse("racwd"), // "r" means read permission
    startsOn: new Date(new Date().valueOf() - 5 * 60 * 1000),
    expiresOn: new Date(new Date().valueOf() + 3600 * 1000), // 1 hour expiration
  }, sharedKeyCredential).toString();

  // Construct the download URL with the SAS token
  // temp removal

  // Return the download URL
  return Response.json({ blobUrl : blockBlobClient.url, sasToken });
}