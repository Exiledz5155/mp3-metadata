"use client";
import React, { useState } from 'react';

const DownloadPage: React.FC = () => {
  const [fileName, setFileName] = useState('');
  const [userUUID, setUserUUID] = useState('');

  const handleDownload = async () => {
    try {
      // Call the download API to get the download URL
      const response = await fetch(`/api/download?fileName=${encodeURIComponent(fileName)}&userUUID=${encodeURIComponent(userUUID)}`);
      const { blobUrl, sasToken } = await response.json();

      // Check if blobUrl or sasToken is undefined
      if (!blobUrl || !sasToken) {
      console.error('Blob URL or SAS token is missing from the response');
      return; // Exit the function to avoid further errors
      }

    // Navigate directly using blobUrl and sasToken
    window.location.href = `${blobUrl}?${sasToken}`;
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

