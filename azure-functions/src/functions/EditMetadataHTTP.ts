import { app, HttpRequest, InvocationContext, HttpResponseInit, } from "@azure/functions";
import {BlobServiceClient } from "@azure/storage-blob";
import { PrismaClient } from '@prisma/client';
import * as nodeID3 from "node-id3";
import axios from 'axios';
import * as path from 'path';

async function getImageAsBuffer(imageUrl: string): Promise<Buffer> {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    return Buffer.from(response.data);
}

async function updateMP3Metadata(filePath: string, metadata: any): Promise<Buffer> {
    // Split the filePath by '/' to get an array of segments
    const pathSegments = filePath.split('/');

    // Remove the first segment (the container name) and rejoin the rest back into a path
    const blobPath = pathSegments.slice(1).join('/');

    const AZURE_STORAGE_CONNECTION_STRING = process.env["AzureWebJobsStorage"];
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      console.log('AzureWebJobsStorage environment variable is not defined.');
      throw new Error('AzureWebJobsStorage environment variable is not defined.');
    }
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerName = "mp3container"; // Replace with your actual container name
    const blockBlobClient = blobServiceClient.getContainerClient(containerName).getBlockBlobClient(blobPath);

    if (metadata.image) {
        // Download the image from the URL
        const imageBuffer = await getImageAsBuffer(metadata.image);

        // Add image to metadata
        metadata.image = {
            mime: 'image/jpeg', 
            type: {
                id: 3,
                name: 'front cover'
            },
            description: 'Cover image',
            imageBuffer: imageBuffer
        };
    }

        try {
            // Download the original MP3 file
            const downloadResponse = await blockBlobClient.download(0);
            const originalMp3Buffer = await streamToBuffer(downloadResponse.readableStreamBody!);
    
            // Update the MP3 metadata
            const success = nodeID3.update(metadata, originalMp3Buffer);
            if (!success) {
                throw new Error("Failed to update ID3 tags.");
            }
    
            return success; // Return the updated MP3 buffer
        } catch (error) {
            console.error("Error updating MP3 metadata:", error.message);
            throw error; // Rethrow the error to be handled by the caller
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
        const keys = ['title', 'artist', 'year', 'albumTitle', 'albumArtist', 'trackNumber', 'genre', 'duration', 'image'];
        keys.forEach(key => {
            if (mp3File[key] !== null && mp3File[key] !== undefined) {
                metadata[key] = mp3File[key];
            }
        });
        

        const updatedMp3Buffer = await updateMP3Metadata(filePath, metadata);
        console.log(`Buffer length: ${updatedMp3Buffer.length}`)

        // Return the updated MP3 file directly to the user
        return {
            status: 200, // OK
            body: updatedMp3Buffer,
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': `attachment; filename="${path.basename(filePath)}"`
            }
        };
        
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
};
app.http('EditMetadataHTTP', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: EditMetadataHTTP
});
          
