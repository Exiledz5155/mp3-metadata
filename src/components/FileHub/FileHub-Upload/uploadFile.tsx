export async function uploadFile(
  file: File,
  userUUID: string,
  container: string
): Promise<Response> {
  // create file path using userUUID and file name
  const userFilePath = `${userUUID}/${encodeURIComponent(file.name)}`;
  // Use fetch to call SAS API route with file path as param
  const response = await fetch(
    `/api/upload?fileName=${userFilePath}&container=${container}`
  );

  const { blobUrl, sasToken } = await response.json();
  // Create full URL
  const fullBlobUrl = `${blobUrl}?${sasToken}`;

  // Set up request options
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob",
      // Add other headers as needed
    },
    body: file,
  };

  // Perform the fetch request
  const uploadResponse = await fetch(fullBlobUrl, requestOptions);

  // Check if the request was successful
  if (!uploadResponse.ok) {
    throw new Error("Failed to upload file");
  }

  return uploadResponse;
}
