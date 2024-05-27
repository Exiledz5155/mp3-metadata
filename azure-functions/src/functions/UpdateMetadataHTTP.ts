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
    // Use a transaction to ensure atomicity
    await prisma.$transaction(async (prisma) => {
      const albumTitle = metadata.albumTitle;
      let album;

      if (albumTitle) {
        // Try to find or create an album with the new title within the transaction
        album = await prisma.album.upsert({
          where: {
            title_sessionId: {
              title: albumTitle,
              sessionId: uuid,
            },
          },
          create: {
            title: albumTitle,
            artist: metadata.albumArtist,
            sessionId: uuid,
          },
          update: {},
        });
      }

      // Update the mp3File records
      await Promise.all(
        ids.map((id) =>
          prisma.mp3File.update({
            where: { id: id },
            data: album ? { ...metadata, albumId: album.id } : metadata,
          })
        )
      );
    });

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
