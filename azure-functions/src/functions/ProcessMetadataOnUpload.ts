import { app, InvocationContext } from "@azure/functions";
import * as ID3 from "node-id3";
import { PrismaClient } from "@prisma/client";

// Handler function to process the uploaded MP3 blob and extract metadata
async function ProcessMetadataOnUpload(
  blob: Buffer,
  context: InvocationContext
): Promise<void> {
  context.log(
    `Storage blob function processed blob with size ${blob.length} bytes`
  );

  // Initialize Prisma
  const prisma = new PrismaClient();
  
  // Placeholder Session Handling
  let session = await prisma.session.findFirst({
    where: {
      id: "test", // Use the actual session ID here
    },
  });
  if (!session) {
    // Create a new Session if it doesn't exist
    session = await prisma.session.create({
      data: {
        id: "test" || "Unknown ID"
        // Add any required fields for a Session here
      },
    });
  }

  // Read MP3 Metadata
  const tags = ID3.read(blob);

  if (tags) {
    // Handling Album
    let album = await prisma.album.findFirst({
      where: {
        title: tags.album || "Unknown Album",
        // Here we ensure that the album is also linked to our placeholder session
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
      title: tags.title || null,
      artist: tags.artist || null,
      year: tags.year ? parseInt(tags.year, 10) : null,
      albumTitle: tags.album || null,
      albumArtist: tags.artist || null,
      trackNumber: tags.trackNumber ? parseInt(tags.trackNumber, 10) : null,
      image: "path-or-url-to-image", // Modify as per your logic
      albumId: album.id, // Link to the Album ID
      sessionId: session.id, // Link to the placeholder Session ID
    };

    // Insert metadata into Azure SQL Database
    try {
      const mp3File = await prisma.mp3File.create({
        data: mp3Data,
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
  path: "mp3container/{name}", // Listen for blobs uploaded to 'mp3container' container
  connection: "AzureWebJobsStorage", // Use the connection string named 'AzureWebJobsStorage' from the application settings
  handler: ProcessMetadataOnUpload,
});
