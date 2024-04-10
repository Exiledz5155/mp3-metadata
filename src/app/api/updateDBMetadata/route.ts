import { PrismaClient } from '@prisma/client'

export async function POST(request: Request) {
    // Parse the request body
    const body = await request.json();
    const { ids, metadata } = body;

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
    
    // Update each item in the database with the provided info
    const updates = ids.map(id => {
      return prisma.mp3File.update({
        where: { id: id },
        data: metadata,
      });
    });

    try {
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
        } 
      });
    } finally {
      // Disconnect from Prisma after we are done
      await prisma.$disconnect();
    }
  }

