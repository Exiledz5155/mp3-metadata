import type { NextApiRequest, NextApiResponse } from "next";
import { BlobServiceClient } from "@azure/storage-blob";
import Busboy from "busboy";

// According to GPT4, we need to use a either bus boy or formidable
// because "Next.js's API routes are designed to handle JSON
// and URL-encoded data out of the box, but not multipart/form-data,
// which is what file uploads typically use."

// Currently running into a few problems, could be caused here
// Could also be caused in FileHub.tsx where the upload button is too.

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const busboy = new Busboy({ headers: req.headers });
    busboy.on("file", async (fieldname, file, filename) => {
      const blobServiceClient = BlobServiceClient.fromConnectionString(
        process.env.AZURE_STORAGE_CONNECTION_STRING
      );
      const containerClient =
        blobServiceClient.getContainerClient("mp3container");
      const blockBlobClient = containerClient.getBlockBlobClient(filename);

      try {
        await blockBlobClient.uploadStream(file);
        res.status(200).json({ message: "File uploaded successfully" });
      } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Error uploading file" });
      }
    });
    req.pipe(busboy);
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
