// src/app/api/generateSasToken/route.ts
import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  ContainerSASPermissions,
} from "@azure/storage-blob";

export async function POST(request: Request) {
  try {
    // Takes in params (filename) from API call creates a const for later use
    const url = new URL(request.url);
    const blobName = url.searchParams.get("fileName") || "defaultFileName.mp3";
    const formData = await request.formData();
    const file = formData.get("file") as Blob;

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
        permissions: ContainerSASPermissions.parse("rcw"), // read, create, write
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 1800 * 1000), // Token expiration in ms
      },
      sharedKeyCredential
    ).toString();

    // Create full URL
    const fullBlobUrl = `${blockBlobClient.url}?${sasToken}`;

    // // Set up request options
    // const requestOptions: RequestInit = {
    //   method: "PUT",
    //   headers: {
    //     "x-ms-blob-type": "BlockBlob",
    //   },
    //   body: file,
    // };

    // // Perform the fetch request
    // const uploadResponse = await fetch(fullBlobUrl, requestOptions);

    // Upload the file using BlockBlobClient.uploadData
    const uploadResponse = await blockBlobClient.uploadData(file, {
      onProgress: (progress) => {
        if (progress.loadedBytes) {
          const percentCompleted = Math.round(
            (progress.loadedBytes * 100) / file.size
          );
          // Send progress to the frontend using Server-Sent Events (SSE)
          // Note: You need to implement the SSE mechanism in your frontend
          // to receive and handle these progress events
          request.emit("progress", `data: ${percentCompleted}\n\n`);
        }
      },
    });

    // Check if the upload was successful
    if (uploadResponse._response.status !== 201) {
      throw new Error("Failed to upload file");
    }

    // // Check if the request was successful
    // if (!uploadResponse.ok) {
    //   throw new Error("Failed to upload file");
    // }

    return new Response(JSON.stringify({ status: "success" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // return Response.json({ status: "success" });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
