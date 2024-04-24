import { BlobServiceClient } from "@azure/storage-blob";
import { PrismaClient } from "@prisma/client";

import {
  app,
  InvocationContext,
  HttpRequest,
  HttpResponseInit,
} from "@azure/functions";


// Handler function to clean up data for a user based on uuid

export async function SessionCleanupHTTP(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

    // Retrieve uuid from query parameters or body
    const uuid = request.query.get("uuid");
    if (!uuid) {
      // 'uuid' is not provided, return a failure response
      return {
        status: 400, // Bad Request status code
        body: "Failure: uuid query parameter is required.",
      };
    }

    const prisma = new PrismaClient();

    try { // START OF TRY BLOCK
        context.log(`Entered Try Block for Prisma Deletion`);
        await prisma.session.deleteMany({
            where: {
                id: uuid,
            },
        });

        const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);
        const containerClient = blobServiceClient.getContainerClient("mp3container");

        if (await containerClient.exists()) {  //IF CLIENT EXISTS

          const blobs = containerClient.listBlobsFlat({
            prefix: `${uuid}/` // Ensure the prefix ends with a '/' to denote a folder
          });

            for await (const blob of blobs) {
                const blobClient = containerClient.getBlobClient(blob.name);
                context.log(`ATTEMPTING TO DELETE --> ${blob.name}`);
                await blobClient.delete(); 
                context.log(`SUCCESS: TO DELETE --> ${blob.name}`);

            }
            return {
              status: 200,
              body: `Cleared all data for user UUID: ${uuid}`
          };
        } // IF CLIENT DNE


        else {
          return {
            status: 500,
            body: `Cannot establish connection to blob/container: ${uuid}`
        }
        }
    } // END OF TRY BLOCK
     catch (error) {
        context.log(`Error deleting data for user UUID: ${uuid}. Error: ${error}`);
        return {
            status: 500,
            body: `Error processing your request: ${error.message}`
        };
    } finally {
        await prisma.$disconnect();
    }
};


app.http("SessionCleanupHTTP", {
  methods: ["GET"],
  authLevel: "anonymous",
  handler: SessionCleanupHTTP,
});
