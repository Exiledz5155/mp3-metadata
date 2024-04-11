import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        const albums = await prisma.album.findMany({
            include: {
                mp3Files: true,
                session: true,
            },
        });
        const response = albums.map(album => ({
            album: album.title,
            artist: album.artist ?? 'Unknown Artist',
            session: {
                id: album.session.id,
            },
            songs: album.mp3Files.map((file) => ({
                trackNumber: file.trackNumber,
                title: file.title,
                duration: file.duration ?? 'Unknown Duration',
                artist: file.artist ?? 'Unknown Artist',
                album: file.albumTitle ?? album.title,
                year: file.year ?? 'Unknown Year',
                genre: file.genre ?? 'Unknown Genre',
                image: file.image ?? 'Default Image',
            })),
        }));
        res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
    }
}
    