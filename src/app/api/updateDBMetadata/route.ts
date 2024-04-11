import { PrismaClient } from '@prisma/client'

export async function POST(request: Request) {
    // Parse the request body
    const body = await request.json();
    const { uuid, ids, metadata } = body;

    if (!ids || !metadata) {
      return new Response(JSON.stringify({ error: 'Missing parameters' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    // Initialize Prisma
    const prisma = new PrismaClient();
    
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
                // You might need to add additional fields such as session ID or artist here
                sessionId: uuid, // This needs to be dynamically set based on your requirements
              },
            });
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
      return new Response(JSON.stringify({ message: 'Items updated successfully' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.error('Failed to update items', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } finally {
      // Disconnect from Prisma after we are done
      await prisma.$disconnect();
    }
  }

