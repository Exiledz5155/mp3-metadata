// viewUploads.tsx
import React from 'react';

export default function UploadedFilesList() {
  const uploadedFiles = JSON.parse(sessionStorage.getItem('uploadedFiles') || '[]');

  return (
    <div>
      <h2>Uploaded Files</h2>
      <ul>
        {uploadedFiles.map((file, index) => (
          <li key={index}>{file.fileName} - {file.timestamp}</li>
        ))}
      </ul>
    </div>
  );
};

