"use client";

import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

interface UUIDFileUploadProps {
  onUploadSuccess?: (response: Response) => void;
  onUploadFailure?: (error: Error) => void;
}

const UUIDFileUpload: React.FC<UUIDFileUploadProps> = ({
  onUploadSuccess,
  onUploadFailure,
}) => {
  // State to store the selected file and user UUID
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Function to handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Function to handle file upload
  const handleUpload = async () => {
    if (selectedFile) {
      try {
        // Generate UUID only when upload is triggered
        const userUUID = sessionStorage.getItem("userUUID") || generateUUID();
        sessionStorage.setItem("userUUID", userUUID);
        // Call the uploadFile function with the selected file and user UUID
        const response = await uploadFile(selectedFile, userUUID);

        // Check if the upload was successful
        if (response.ok) {
          console.log("File uploaded successfully");

          // Invoke the onUploadSuccess callback if provided
          if (onUploadSuccess) onUploadSuccess(response);
        } else {
          // If the response is not okay, throw an error
          throw new Error("Upload failed");
        }
      } catch (error) {
        // Log the error and invoke the onUploadFailure callback if provided
        console.error(error);
        if (onUploadFailure && error instanceof Error) onUploadFailure(error);
      }
    }
  };

  return (
    <div>
      {/* Input for file selection */}
      <input type="file" onChange={handleFileChange} />

      {/* Button to trigger file upload, disabled if no file selected */}
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
};

export default UUIDFileUpload;

// Utility function to generate a UUID
function generateUUID(): string {
  const generatedUUID = uuidv4();
  return generatedUUID;
}

// Async function to upload the file with user UUID
async function uploadFile(file: File, userUUID: string): Promise<Response> {
  // create file path using userUUID and file name
  const userFilePath = `${userUUID}/${encodeURIComponent(file.name)}`;
  // Use fetch to call SAS API route with file path as param
  const response = await fetch(
    `/api/generateSasToken?fileName=${userFilePath}`
  );

  const { blobUrl, sasToken } = await response.json();
  // Create full URL
  const fullBlobUrl = `${blobUrl}?${sasToken}`;

  // Store the uploaded file information in session storage
  const uploadedFiles = JSON.parse(
    sessionStorage.getItem("uploadedFiles") || "[]"
  );
  uploadedFiles.push({
    fileName: file.name,
    timestamp: new Date().toISOString(),
  });
  sessionStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));

  // Debugging
  console.log("Blob URL:", blobUrl);
  console.log("Full URL:", fullBlobUrl);

  // Set up request options
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob",
      // Add other headers as needed
    },
    body: file,
  };

  // Return the result of the file upload
  return fetch(fullBlobUrl, requestOptions);
}
