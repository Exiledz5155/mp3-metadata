// src/components/UUIDFileUpload.tsx
"use client";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as mm from 'music-metadata-browser';

interface UUIDFileUploadProps {
  onUploadSuccess?: (response: Response) => void;
  onUploadFailure?: (error: Error) => void;
}

export interface ID3Metadata {
  title: string;
  artist: string;
  album: string;
  year: string;
  genre: string;
  track: string;
}

const UUIDFileUpload: React.FC<UUIDFileUploadProps> = ({
  onUploadSuccess,
  onUploadFailure,
}) => {
  // State to store the selected file and user UUID
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Async function to extract ID3 metadata from the file
  async function extractID3Metadata(file: File): Promise<ID3Metadata> {
    try {
      const buffer = await file.arrayBuffer();
      const metadata = await mm.parseBuffer(Buffer.from(buffer), 'audio/mpeg');

      const { title, artist, album, year, genre, track } = metadata.common || {};

      return {
        title: title || '',
        artist: artist || '',
        album: album || '',
        year: year ? year.toString() : '',
        genre: genre ? genre.toString() : '',
        track: track ? track.toString() : '',
      };
    } catch (error) {
      console.error('Error extracting ID3 metadata:', error);
      throw error;
    }
  }

  // Async function to upload the file with user UUID and extract metadata
  async function uploadFile(file: File, userUUID: string): Promise<Response> {
    try {
      // Extract ID3 metadata
      const id3Metadata = await extractID3Metadata(file);

      // Set file name to URLComponent
      const fileName = encodeURIComponent(file.name);
      // Use fetch to call SAS API route with file name and user UUID as query params
      const response = await fetch(
        `/api/generateSasToken?fileName=${fileName}&userUUID=${userUUID}`
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
        id3Metadata, // Add the extracted metadata to the uploaded file
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
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  }

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

  // Utility function to generate a UUID
  function generateUUID(): string {
    const generatedUUID = uuidv4();
    return generatedUUID;
  }

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
