// Assumes file type handling prior to function call
export async function UploadMP3(
  file: File,
  userUUID: string
): Promise<Response> {
  // create file path using userUUID and file name
  const userFilePath = `${userUUID}/${encodeURIComponent(file.name)}`;
  // Use fetch to call SAS API route with file path as param
  const response = await fetch(`/api/upload/mp3?fileName=${userFilePath}`);

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

// Assumes file type handling prior to function call
// export async function UploadIMG(
//   file: File,
//   userUUID: string,
//   songID: number
// ): Promise<Response> {
//   // grab img extension (png or jpg), create new filename with ID
//   const fileParts = file.name.split(".");
//   const songNameID = `${songID}.${fileParts[fileParts.length - 1]}`;

//   // create file path using userUUID and new image name
//   const userFilePath = `${userUUID}/${encodeURIComponent(songNameID)}`;
//   // Use fetch to call SAS API route with file path as param
//   const response = await fetch(
//     `/api/upload?fileName=${userFilePath}&container=imagecontainer`
//   );

//   // console.log(response);

//   const { blobUrl, sasToken } = await response.json();
//   // Create full URL
//   const fullBlobUrl = `${blobUrl}?${sasToken}`;

//   // Set up request options
//   const requestOptions: RequestInit = {
//     method: "PUT",
//     headers: {
//       "x-ms-blob-type": "BlockBlob",
//       // Add other headers as needed
//     },
//     body: file,
//   };

//   // Perform the fetch request
//   const uploadResponse = await fetch(fullBlobUrl, requestOptions);

//   // console.log(uploadResponse);

//   // Check if the request was successful
//   if (!uploadResponse.ok) {
//     throw new Error("Failed to upload file");
//   }

//   return uploadResponse;
// }

// Assumes file type handling prior to function call
// Assumes file type handling prior to function call
export async function UploadIMG(
  file: File,
  userUUID: string,
  songIDs: number[]
): Promise<Response> {
  // Create request body
  const requestBody = {
    file: await file.arrayBuffer(),
    userUUID: userUUID,
    songIDs: songIDs,
  };

  // Use fetch to call the new API route for image upload
  const response = await fetch("/api/upload/img", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  });

  // Check if the request was successful
  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return response;
}
