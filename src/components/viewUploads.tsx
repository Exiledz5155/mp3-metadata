// viewUploads.tsx
"use client"
import { useEffect, useState } from 'react';

interface UploadedFile {
  fileName: string;
  timestamp: string; // Assuming timestamp is a string, you can adjust the type accordingly
}

export default function UploadedFilesList() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  useEffect(() => {
    // Check if window is defined to make sure this runs on the client side
    if (typeof window !== 'undefined') {
      console.log("sessionStorage is avaiable");
      const storedFiles = JSON.parse(sessionStorage.getItem('uploadedFiles') || '[]');
      setUploadedFiles(storedFiles);
    }
    else {
      console.log("session storage is unavailable");
    }
  }, []);

  return (
    <div style={{ color: 'white' }}>
      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>{file.fileName} - {file.timestamp}</li>
        ))}
      </ul>
    </div>
  );
};
