"use client";
import React, { useState } from 'react';
import { v4 as uuidv4 } from "uuid";

const DownloadPage: React.FC = () => {
  const [fileName, setFileName] = useState('');
  const [userUUID, setUserUUID] = useState('');

  const handleDownload = async () => {
    try {
      //get uuid
      const userUUID = sessionStorage.getItem("userUUID") || generateUUID();
      sessionStorage.setItem("userUUID", userUUID);

      //TODO: get actual file name for what is getting downloaded
      const fileName = `Cigarettes.mp3`

      //call azure function to download file and update metadata 
      const response = await fetch(`https://mp3functions.azurewebsites.net/api/editmetadatahttp?filePath=mp3container/${userUUID}/${fileName}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Assuming the function returns a binary file, adjust the mime type if necessary
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName; // Specify the filename you want for the download
      document.body.appendChild(a); // Required for this to work in FireFox
      a.click();
      a.remove(); // After downloading, remove the element and revoke the URL

      // Optional: free up memory by revoking the object URL
      window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Failed to download file:', error);
        }
      };

  return (
    <div>
      <input type="text" value={fileName} onChange={(e) => setFileName(e.target.value)} placeholder="File Name" />
      <input type="text" value={userUUID} onChange={(e) => setUserUUID(e.target.value)} placeholder="User UUID" />
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default DownloadPage;

// Utility function to generate a UUID
function generateUUID(): string {
  const generatedUUID = uuidv4();
  return generatedUUID;
}

