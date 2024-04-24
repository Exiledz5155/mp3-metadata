import {
  app,
  InvocationContext,
  HttpRequest,
  HttpResponseInit,
} from "@azure/functions";
import { PrismaClient } from "@prisma/client";

export async function getAlbumsHTTP(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const uuid = request.query.get("uuid");

  if (!uuid) {
    // 'uuid' is not provided, return a failure response
    return {
      status: 400, // Bad Request status code
      body: "Failure: uuid query parameter is required.",
    };
  }

  const prisma = new PrismaClient();
  try {
    const albums = await prisma.album.findMany({
      where: {
        sessionId: uuid,
      },
      include: {
        mp3Files: true,
        session: true,
      },
    });

    if (!albums || albums.length === 0) {
      return {
        status: 404, // Not Found
        body: JSON.stringify({
          error: "Failure: No albums found with the specified uuid.",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }

    const response = albums.map((album) => ({
      album: album.title,
      artist: album.artist ?? "",
      session: {
        id: album.session.id,
      },
      songs: album.mp3Files.map((file) => ({
        id: file.id,
        trackNumber: file.trackNumber,
        title: file.title,
        duration: file.duration ?? "",
        artist: file.artist ?? "",
        albumTitle: file.albumTitle ?? album.title,
        albumArtist: file.albumArtist ?? "",
        year: file.year ?? "",
        genre: file.genre ?? "",
        image: file.image ?? "",
      })),
    }));

    console.log("processed album:", response);

    return {
      status: 200, // OK
      body: JSON.stringify(response),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    context.log(`Database query failed: ${error.message}`);
    return {
      status: 500, // Internal Server Error
      body: JSON.stringify({
        error: "Failure: An error occurred while querying the database.",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } finally {
    // Disconnect from Prisma after we are done
    await prisma.$disconnect();
  }
}
app.http("GetAlbumsHTTP", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: getAlbumsHTTP,
});
