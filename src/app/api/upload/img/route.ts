// src/app/api/upload/img/route.ts

export async function POST(request: Request) {
  const requestBody = await request.json();
  const file = requestBody.file;
  const userUUID = requestBody.userUUID;
  const songIDs = requestBody.songIDs;
  const azureAPI = process.env.AZURE_UPLOAD_IMG_API || "";

  try {
    const response = await fetch(azureAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        file: file,
        userUUID: userUUID,
        songIDs: songIDs,
      }),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Azure Function error:", errorText);
      throw new Error("Failed to update image");
    }

    return Response.json({ status: "success" });
  } catch (error) {
    console.error("Error updating image:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
