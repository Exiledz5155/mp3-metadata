// src/app/api/upload/img/route.ts

export async function POST(request: Request) {
  const requestBody = await request.json();
  const file = requestBody.file;
  const userUUID = requestBody.userUUID;
  const songIDs = requestBody.songIDs;

  // Forward the request to the Azure Function
  const response = await fetch(
    "https://mp3functions.azurewebsites.net/api/UpdateImageHTTP?",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: new Uint8Array(file),
        userUUID: userUUID,
        songIDs: songIDs,
      }),
    }
  );

  // Check if the request was successful
  if (!response.ok) {
    throw new Error("Failed to update image");
  }

  return Response.json({ status: "success" });
}
