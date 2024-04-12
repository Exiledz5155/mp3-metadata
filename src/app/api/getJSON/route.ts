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
      artist: album.artist ?? "",
      session: {
        id: album.session.id,
      },
      songs: album.mp3Files.map((file) => ({
        trackNumber: file.trackNumber,
        title: file.title,
        duration: file.duration ?? "",
        artist: file.artist ?? "",
        album: file.albumTitle ?? album.title,
        year: file.year ?? "",
        genre: file.genre ?? "",
        image: file.image ?? "",
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
