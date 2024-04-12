import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(request: Request) {
  // changed from req because typescript typing

  try {
    const url = new URL(request.url);
    const uuid = url.searchParams.get("uuid") || ""; // search for uuid param
    const albums = await prisma.album.findMany({
      where: {
        sessionId: uuid, // Filter to match only albums with the specified session ID
      },
      include: {
        mp3Files: true,
        session: true,
      },
    });
    const response = albums.map((album) => ({
      album: album.title,
      artist: album.artist ?? "Unknown Artist",
      session: {
        id: album.session.id,
      },
      songs: album.mp3Files.map((file) => ({
        trackNumber: file.trackNumber,
        title: file.title,
        duration: file.duration ?? "Unknown Duration",
        artist: file.artist ?? "Unknown Artist",
        album: file.albumTitle ?? album.title,
        year: file.year ?? "Unknown Year",
        genre: file.genre ?? "Unknown Genre",
        image: file.image ?? "Default Image",
      })),
    }));
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
