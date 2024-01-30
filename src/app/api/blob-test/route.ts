//this route doesnt do anything rn but may be needed when we are extracting metadata?

import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING || '');
    const containerClient = blobServiceClient.getContainerClient('test');
    const blobName = 'test.mp3';
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const sasToken = generateSasToken(blockBlobClient); // Implement this function to generate a SAS token
    res.status(200).json({ blobUrl: blockBlobClient.url, sasToken });
  } else {
    // Handle other HTTP methods or return an error
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

function generateSasToken(blockBlobClient: BlockBlobClient): string {
  // Logic to generate a SAS token
  // Ensure to return a string type
  return '';
}
