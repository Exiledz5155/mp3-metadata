// Assumes file type handling prior to function call
export async function UploadMP3(
  file: File,
  userUUID: string
  onProgress: (progress: number) => void
): Promise<Response> {
  // create file path using userUUID and file name
  const userFilePath = `${userUUID}/${encodeURIComponent(file.name)}`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("userFilePath", userFilePath);

  const controller = new AbortController();
  const signal = controller.signal;

  const response = await fetch(`/api/upload/mp3?fileName=${userFilePath}`, {
    method: "POST",
    body: formData,
    signal: signal,
  });

  if (!response.ok) {
    throw new Error("Failed to upload file");
  }

  return response;
}

export async function UploadMP3(
  file: File,
  userUUID: string,
  onProgress: (progress: number) => void
): Promise<Response> {
  const userFilePath = `${userUUID}/${encodeURIComponent(file.name)}`;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("userFilePath", userFilePath);
  const response = await fetch(`/api/upload/mp3?fileName=${userFilePath}`, {
    method: "POST",
    body: formData,
    signal: abortController.signal,
  });
  if (!response.ok) {
    throw new Error("Failed to upload file");
  }
  return response;
}

// Assumes file type handling prior to function call
export async function UploadIMG(
  file: File,
  userUUID: string,
  songIDs: number[]
): Promise<Response> {
  // Create request body
  const fileBase64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove the prefix `data:<type>;base64,` from the result
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // Create request body
  const requestBody = {
    file: fileBase64,
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
