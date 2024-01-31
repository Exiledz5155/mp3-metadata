"use client";
import React, { useState } from "react";

interface FileUploadProps {
  onUploadSuccess?: (response: Response) => void; // Callback function takes in response as argument
  onUploadFailure?: (error: Error) => void; // Same as above, but with error
}

// Using FileUploadProps interface to create functional react component
const FileUpload: React.FC<FileUploadProps> = ({
  onUploadSuccess,
  onUploadFailure,
}) => {
  // Initializes state variable selectedFile to store file selected, setSelectedFile is the function used to update this
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Triggered when user selects a file/ changes files
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  // Async function with try catch to attempt to upload to blob
  const handleUpload = async () => {
    if (selectedFile) {
      // Selected file not Null...
      try {
        const response = await uploadFile(selectedFile);
        if (response.ok) {
          console.log("File uploaded successfully");
          if (onUploadSuccess) onUploadSuccess(response);
        } else {
          throw new Error("Upload failed");
        }
      } catch (error) {
        console.error(error);
        if (onUploadFailure && error instanceof Error) onUploadFailure(error); // WTF??? Either too galaxy brain or gpt nonsense.
        // GPT: "If the upload fails, it throws an error, which is caught in the catch block. It logs the error and optionally calls onUploadFailure."
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={!selectedFile}>
        Upload
      </button>
    </div>
  );
};

export default FileUpload;

async function uploadFile(file: File): Promise<Response> {
  // Sets file name to URLComponent
  const fileName = encodeURIComponent(file.name);

  // Use fetch to call sas API route with file name as query param
  const response = await fetch(`/api/generateSasToken?fileName=${fileName}`); // Note: These are NOT quotes they are back ticks ``````
  const { blobUrl, sasToken } = await response.json(); // Await API call to return Blob URL and sasToken

  // Create full url
  const fullBlobUrl = `${blobUrl}?${sasToken}`;

  // Debugging
  console.log("blob url:", blobUrl);
  console.log("full url:", fullBlobUrl);

  //
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob", // x-ms-blob-type just sets the type of blob to create
    },
    body: file,
  };

  // idk come back to this
  return fetch(fullBlobUrl, requestOptions);
}
