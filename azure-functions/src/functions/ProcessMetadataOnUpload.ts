//default azure blob storage trigger function template
// import { app, InvocationContext } from "@azure/functions";

// export async function ProcessMetadataOnUpload(blob: Buffer, context: InvocationContext): Promise<void> {
//     context.log(`Storage blob function processed blob "${context.triggerMetadata.name}" with size ${blob.length} bytes`);
// }

// app.storageBlob('ProcessMetadataOnUpload', {
//     path: 'mp3container',
//     connection: '9bef36_STORAGE',
//     handler: ProcessMetadataOnUpload
// });


import { app, InvocationContext } from "@azure/functions";
import * as ID3 from "node-id3";
import { PrismaClient } from "@prisma/client";


// Handler function to process the uploaded MP3 blob and extract metadata
async function ProcessMetadataOnUpload(blob: Buffer, context: InvocationContext): Promise<void> {
    context.log(`Storage blob function processed blob with size ${blob.length} bytes`);

    //initialize prisma
    const prisma = new PrismaClient();

    // Read MP3 Metadata
    const tags = ID3.read(blob);

    if (tags) {
        // Map ID3 tags to Song model
        const songData = {
            title: tags.title || "Unknown Title",
            artist: tags.artist || "Unknown Artist",
            year: parseInt(tags.year, 10) || 0,
            album: tags.album || "Unknown Album",
            genre: tags.genre || "Unknown Genre",
            track: parseInt(tags.trackNumber, 10) || 0,
        };

        // Insert metadata into Azure SQL Database
        try {
            const song = await prisma.song.create({
                data: songData,
            });
            context.log(`Inserted song metadata into database: ${JSON.stringify(song)}`);
        } catch (error) {
            context.log(`Error inserting song metadata into database`);
        } finally {
            await prisma.$disconnect();
        }
    } else {
        context.log("No tags found in MP3 file.");
    }
}

// Register the Blob storage trigger with the Azure Functions app
app.storageBlob('ProcessMetadataOnUpload', {
    path: 'mp3container/{name}', // Listen for blobs uploaded to 'mp3container' container
    connection: 'AzureWebJobsStorage', // Use the connection string named 'AzureWebJobsStorage' from the application settings
    handler: ProcessMetadataOnUpload
});



