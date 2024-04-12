import { app, InvocationContext } from "@azure/functions";
import * as ID3 from "node-id3";
import { PrismaClient } from "@prisma/client";
import { BlobServiceClient } from "@azure/storage-blob";

// Handler function to process the uploaded MP3 blob and extract metadata
async function ProcessMetadataOnUpload(
  blob: Buffer,
  context: InvocationContext
): Promise<void> {
  // Ensure triggerMetadata is not undefined
  if (!context.triggerMetadata) {
    context.log('triggerMetadata is undefined.');
    return;
  }
  //get userUUID and fileName from file path
  const userUUID = context.triggerMetadata.userUUID as string;
  const fileName = context.triggerMetadata.name as string;
  // reconstruct filePath
  const path = "mp3container/" + userUUID + "/" + fileName

  context.log(
    `Storage blob function processed blob with size ${blob.length} bytes`
  );

  // Initialize Prisma
  const prisma = new PrismaClient();
  
  // check if there is already a session of userUUID
  let session = await prisma.session.findUnique({
    where: {
      id: userUUID
    },
  });
  if (!session) {
    // Create a new Session if it doesn't exist
    session = await prisma.session.create({
      data: {
        id: userUUID || "Unknown ID"
        // Add any required fields for a Session here
      },
    });
  }

  // Read MP3 Metadata of file
  const tags = ID3.read(blob);

  if (tags) {

    //Initialize Azure Blob Service Client
    const AZURE_STORAGE_CONNECTION_STRING = process.env["AzureWebJobsStorage"];
    if (!AZURE_STORAGE_CONNECTION_STRING) {
      context.log('AzureWebJobsStorage environment variable is not defined.');
      return;
    }
    const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
    const containerName = 'imagecontainer'; // Use the same container as MP3 files
    const containerClient = blobServiceClient.getContainerClient(containerName);

    let imagePath: string | null = null;

    if (tags.image && typeof tags.image !== 'string' && 'imageBuffer' in tags.image) {
      // Store the image in a 'images/' directory within the same container
      const imageFileName = `${fileName.replace(/\.[^/.]+$/, "")}-cover.jpg`; // Change file extension to .jpg
      const blobName = `${userUUID}/${imageFileName}`; // Include the userUUID to keep user data separate
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);

      await blockBlobClient.upload(tags.image.imageBuffer, tags.image.imageBuffer.length);

      imagePath = blockBlobClient.url; // This is the URL to the uploaded image
    } else {
      // Handle cases where `image` is not an object with `imageBuffer` or doesn't exist
      context.log("No image found or image format is not supported.");
    }

    // Handling Album
    let album = await prisma.album.findFirst({ //may need to change this for case where users tries to make multiple albums of same name
      where: {
        title: tags.album || "Unknown Album",
        // Here we ensure that the album is also linked to our session
        sessionId: session.id,
      },
    });

    if (!album) {
      // Create new Album if it doesn't exist, linked to the placeholder Session
      album = await prisma.album.create({
        data: {
          title: tags.album || "Unknown Album",
          sessionId: session.id, // Link to the placeholder Session ID
        },
      });
    }

    // Map ID3 tags to mp3File model
    const mp3Data = {
      filePath: path,
      title: tags.title || null,
      artist: tags.artist || null,
      year: tags.year ? parseInt(tags.year, 10) : null,
      albumTitle: tags.album || null,
      albumArtist: tags.artist || null,
      trackNumber: tags.trackNumber ? parseInt(tags.trackNumber, 10) : null,
      image: imagePath || null, // Modify as per your logic
      genre: tags.genre || null,
      duration: tags.length || null,
      albumId: album.id, // Link to the Album ID
      sessionId: session.id, // Link to the placeholder Session ID
    };

    // Insert metadata into Azure SQL Database
    try {
      const mp3File = await prisma.mp3File.upsert({
        //if file already exists update metadata else create new 
        where: {
          filePath: path
        },
        update: mp3Data,
        create: mp3Data,
      });
      context.log(
        `Inserted MP3 file metadata into database: ${JSON.stringify(mp3File)}`
      );
    } catch (error) {
      context.log(
        `Error inserting MP3 file metadata into database: ${error.message}`
      );
    } finally {
      // Disconnect from Prisma after we are done
      await prisma.$disconnect();
    }
  } else {
    context.log("No tags found in MP3 file.");
  }
}

// Register the Blob storage trigger with the Azure Functions app
app.storageBlob("ProcessMetadataOnUpload", {
  path: "mp3container/{userUUID}/{name}", // Listen for blobs uploaded to 'mp3container' container
  connection: "AzureWebJobsStorage", // Use the connection string named 'AzureWebJobsStorage' from the application settings
  handler: ProcessMetadataOnUpload,
});
