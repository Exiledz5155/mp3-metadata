import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";


export async function GET(request: Request) {
    try {
      // Extract filename from request query parameters
      const url = new URL(request.url);
      const blobName = url.searchParams.get("fileName") || "defaultFileName.mp3";
  
      // Retrieve Azure Storage account details from environment variables
      const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME || "";
      const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY || "";
      const containerName = "mp3container"; // Container where the blob is stored
  
      // Initialize SharedKeyCredential for authentication
      const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);
  
      // Initialize BlobServiceClient with the connection string
      const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);
  
      // Get a ContainerClient for the specified container
      const containerClient = blobServiceClient.getContainerClient(containerName);
  
      // Call the function to download the blob
      await downloadBlobToFile(containerClient, blobName, `./${blobName}`); // Assuming the downloaded file will be saved in the same directory
  
      // Return success response
      return new Response("Blob downloaded successfully", { status: 200 });
    } catch (error) {
      // Handle errors
      return new Response("Error: " + error.message, { status: 500 });
    }
  }
  
  // Function to download blob to a file
  async function downloadBlobToFile(containerClient: any, blobName: string, fileNameWithPath: string): Promise<void> {
    // Get the BlobClient for the specified blob
    const blobClient = await containerClient.getBlobClient(blobName);
    
    // Download the blob to the specified file path
    await blobClient.downloadToFile(fileNameWithPath);
  }