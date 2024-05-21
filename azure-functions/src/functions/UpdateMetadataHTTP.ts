import {
  app,
  InvocationContext,
  HttpRequest,
  HttpResponseInit,
} from "@azure/functions";
import { PrismaClient } from "@prisma/client";

interface UMReqBody {
  uuid: string;
  ids: number[];
  metadata: {
    albumTitle?: string; // Include optional since it may not always be present
    albumArtist?: string;
    trackNumber?: number;
    title?: string;
    artist?: string;
    year?: number;
    genre?: string;
  };
}

export async function UpdateMetadataHTTP(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  if (!request.body) {
    return {
      status: 400,
      body: JSON.stringify({ error: "Request body is empty" }),
      headers: { "Content-Type": "application/json" },
    };
  }

  // Parse the request body
  const body = (await request.json()) as Partial<UMReqBody>;

  if (!body.uuid || !body.ids || !body.metadata || body.ids.length === 0) {
    return {
      status: 400,
      body: JSON.stringify({ error: "Missing parameters" }),
      headers: { "Content-Type": "application/json" },
    };
  }

  const { uuid, ids, metadata } = body;

  // Initialize Prisma
  const prisma = new PrismaClient();

  // TODO: Prevent total failiure if promise fails
  // i.e partial updates are good
  try {
    const updates = ids.map(async (id) => {
      // Check if albumTitle is being updated and handle album association
      if (metadata.albumTitle) {
        // Try to find an existing album with the new title
        let album = await prisma.album.findFirst({
          where: {
            title: metadata.albumTitle,
            sessionId: uuid,
          },
        });

        // If no existing album is found, create a new one
        if (!album) {
          album = await prisma.album.create({
            data: {
              title: metadata.albumTitle,
              artist: metadata.albumArtist,
              // You might need to add additional fields such as session ID or artist here
              sessionId: uuid, // This needs to be dynamically set based on your requirements
            },
          });
          console.log("Created new album");
        }

        // Update the mp3File with the new albumId and other metadata
        return prisma.mp3File.update({
          where: { id: id },
          data: { ...metadata, albumId: album.id },
        });
      } else {
        // If not updating albumTitle, proceed with a standard update
        return prisma.mp3File.update({
          where: { id: id },
          data: metadata,
        });
      }
    });

    await Promise.all(updates);

    // After updates, check and delete any empty albums
    const albumsToCheck = await prisma.album.findMany({
      where: {
        sessionId: uuid,
      },
      include: {
        mp3Files: true,
      },
    });

    const emptyAlbums = albumsToCheck.filter(
      (album) => album.mp3Files.length === 0
    );

    const deletePromises = emptyAlbums.map((album) =>
      prisma.album.delete({
        where: { id: album.id },
      })
    );

    await Promise.all(deletePromises);

    return {
      status: 200,
      body: JSON.stringify({
        message: "Metadata updated to database successfully",
      }),
      headers: { "Content-Type": "application/json" },
    };
  } catch (error) {
    context.log(`Failed to update items: ${error.message}`);
    return {
      status: 500,
      body: JSON.stringify({ error: "Internal server error" }),
      headers: { "Content-Type": "application/json" },
    };
  } finally {
    // Disconnect from Prisma after we are done
    await prisma.$disconnect();
  }
}

app.http("UpdateMetadataHTTP", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: UpdateMetadataHTTP,
});
