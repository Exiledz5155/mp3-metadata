import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { BlobDownloadResponseModel, BlobServiceClient, BlockBlobUploadOptions } from "@azure/storage-blob";
import { PrismaClient } from '@prisma/client';
import * as nodeID3 from "node-id3";


async function updateMP3Metadata(filePath: string, metadata: any): Promise<void> {
    // Split the filePath by '/' to get an array of segments
    const pathSegments = filePath.split('/');

    // Remove the first segment (the container name) and rejoin the rest back into a path
    const blobPath = pathSegments.slice(1).join('/');

    const AZURE_STORAGE_CONNECTION_STRING = process.env["AzureWebJobsStorage"];
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      console.log('AzureWebJobsStorage environment variable is not defined.');
      return;
    }
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerName = "mp3container"; // Replace with your actual container name
    const blockBlobClient = blobServiceClient.getContainerClient(containerName).getBlockBlobClient(blobPath);

    try {
        // Download the MP3 file from Azure Blob Storage
        const downloadBlockBlobResponse: BlobDownloadResponseModel = await blockBlobClient.download(0);
        const downloadedContent = await streamToBuffer(downloadBlockBlobResponse.readableStreamBody!);

        //Update the ID3 tags using nodeID3 and get the updated buffer
        const updatedContent: Buffer = nodeID3.update(metadata, downloadedContent) as Buffer;
        if (!updatedContent) {
            throw new Error("Failed to update ID3 tags");
        }

        // Prepare upload options
        const uploadOptions: BlockBlobUploadOptions = {
            blobHTTPHeaders: {
                blobContentType: "audio/mpeg",
            },
        };

        // Write the updated MP3 file back to Azure Blob Storage
        // Note: Using the `upload` method instead of `uploadData`
        const uploadBlobResponse = await blockBlobClient.upload(updatedContent, updatedContent.length, uploadOptions);

        console.log(`Upload block blob ${filePath} successfully`, uploadBlobResponse.requestId);
    } catch (error) {
        console.error("Error updating MP3 metadata:", error.message);
        throw error;
    }
}

// Helper function to convert a stream to a buffer
function streamToBuffer(stream: NodeJS.ReadableStream): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const chunks: Buffer[] = [];
        stream.on("data", (chunk: Buffer) => chunks.push(chunk));
        stream.on("end", () => resolve(Buffer.concat(chunks)));
        stream.on("error", reject);
    });
}

export async function EditMetadataHTTP(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    //extract the file path from the request
    const filePath = request.query.get('filePath');
    
    if (!filePath) {
        // 'filePath' is not provided, return a failure response
        return {
            status: 400, // Bad Request status code
            body: 'Failure: filePath query parameter is required.'
        };
    }
    // Initialize Prisma
    const prisma = new PrismaClient();
    try {
        

        // Query the database for the mp3File with the given filePath
        const mp3File = await prisma.mp3File.findUnique({
            where: {
                filePath: filePath,
            },
        });

        if (!mp3File) {
            return {
                status: 404, // Not Found
                body: 'Failure: No mp3File found with the specified filePath.'
            };
        }

        // Creating a dictionary with keys that have non-null values
        let metadata = {};
        const keys = ['title', 'artist', 'year', 'albumTitle', 'albumArtist', 'trackNumber']; //TODO add image
        keys.forEach(key => {
            if (mp3File[key] !== null && mp3File[key] !== undefined) {
                metadata[key] = mp3File[key];
            }
        });
        
        //call function to update metadata of file
        await updateMP3Metadata(filePath, metadata);
        
    } catch (error) {
        context.log(`Database query failed: ${error.message}`);
        
        // Return a generic server error response
        return {
            status: 500, // Internal Server Error
            body: 'Failure: An error occurred while querying the database.'
        };
        
    } finally {
        // Disconnect from Prisma after we are done
        await prisma.$disconnect();


};
    return {
                status: 200,
                body: 'Success',
            };
};
app.http('EditMetadataHTTP', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: EditMetadataHTTP
});
          
