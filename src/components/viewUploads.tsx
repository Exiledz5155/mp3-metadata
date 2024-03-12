// src/components/viewUploads.tsx
"use client";
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid function
import { ID3Metadata } from './UUIDFileUpload';


interface UploadedFile {
  userId: string; // Unique user UUID
  fileId: string; // Unique file UUID
  fileName: string;
  timestamp: string;
  id3Metadata: ID3Metadata;
}

export default function UploadedFilesList() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [userUUID, setUserUUID] = useState<string | null>(null);

  const clearSessionStorage = () => {
    if (typeof window !== 'undefined') {
      console.log("Clearing session storage");
      sessionStorage.clear();
      setUploadedFiles([]); // Clear the state as well
      setUserUUID(null); // Clear user UUID state
    }
  };

  useEffect(() => {
    // Check if window is defined to make sure this runs on the client side
    if (typeof window !== 'undefined') {
      console.log("sessionStorage is available");

      // Try to retrieve user UUID from session storage
      const storedUserUUID = sessionStorage.getItem('userUUID');

      if (storedUserUUID) {
        setUserUUID(storedUserUUID);
      }
      else {
        // If user UUID doesn't exist, generate a new one
        const newUserUUID = uuidv4();
        sessionStorage.setItem('userUUID', newUserUUID);
        setUserUUID(newUserUUID);
      }

      const storedFiles = JSON.parse(sessionStorage.getItem('uploadedFiles') || '[]');

      // Add user UUID and unique file UUID to each uploaded file
      const filesWithUUID = storedFiles.map(file => ({
        ...file,
        userId: userUUID || '', // Use the userUUID from state or an empty string if not available
        fileId: uuidv4(),
        
      }));

      setUploadedFiles(filesWithUUID);

      // Add beforeunload event listener
      window.addEventListener('beforeunload', clearSessionStorage);

      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('beforeunload', clearSessionStorage);
      };
    } else {
      console.log("session storage is unavailable");
    }
  }, [userUUID]); // Add userUUID as a dependency

  return (
    <div style={{ color: 'white', padding: '20px', backgroundColor: '#333' }}>
      <style>
        {`
          /* CSS Styles */
          h2 {
            margin-bottom: 10px;
          }

          ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }

          li {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
          }

          span {
            flex: 1;
            margin-right: 10px;
          }

          /* Additional styling for indented ID3 metadata */
          .id3Metadata {
            margin-left: 20px;
          }
        `}
      </style>
      <h2>Uploaded Files</h2>
      {userUUID ? (
        <ul>
          {uploadedFiles.map((file, index) => (
            <li key={index}>
              <span>User: {file.userId}</span>
              <span>File: {file.fileId}</span>
              <span>FileName: {file.fileName}</span>
              <span>Timestamp: {file.timestamp}</span>
              {/* Display ID3Metadata properties with indentation */}
              <span className="id3Metadata">Title: {file.id3Metadata.title}</span>
              <span className="id3Metadata">Artist: {file.id3Metadata.artist}</span>
              <span className="id3Metadata">Album: {file.id3Metadata.album}</span>
              <span className="id3Metadata">Year: {file.id3Metadata.year}</span>
              <span className="id3Metadata">Genre: {file.id3Metadata.genre}</span>
              <span className="id3Metadata">Track Number: {file.id3Metadata.track}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No files uploaded yet.</p>
      )}
    </div>
  );
};
