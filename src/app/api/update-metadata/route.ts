import { NextApiRequest, NextApiResponse } from 'next';
import { update_metadata } from '../../metadata';
import fs from 'fs'

export async function PUT(
  req: NextApiRequest,
  res: NextApiResponse
){
    
      // Read the image file as a buffer
      const imageBuffer = fs.readFileSync('C:/tmp/testimage.jpg');
      // // // Encode the image as base64
      const base64Image = imageBuffer.toString('base64');
    const tags = {
      title: "updated title",
      artist: "mark 2.0",
      album: "very awesome album",
      APIC: {
        type: 3, // The type of the image (3 = cover image)
        data: base64Image,
        description: 'Cover Image',
      },
      TRCK: "27"
      };

      const mp3File = 'C:/tmp/test.mp3';

      const success = update_metadata(tags, mp3File);
      return Response.json({ success: true })
    };
