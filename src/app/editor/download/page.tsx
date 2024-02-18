"use client";

export default function download() {
  if (typeof window !== 'undefined') {
    document.getElementById('downloadButton').addEventListener('click', async () => {
        try {
          // Fetch the download URL from your backend server
          const response = await fetch('/getBlobDownloadUrl');
          if (!response.ok) {
            throw new Error('Failed to fetch download URL');
          }
          const { downloadUrl } = await response.json();
      
          // Create a temporary anchor element
          const anchor = document.createElement('a');
          anchor.href = downloadUrl;
      
          // Set the download attribute to force download and set the filename
          anchor.download = 'blobFilename.ext'; // Set the filename as per your requirement
      
          // Programmatically click the anchor to trigger the download
          anchor.click();
        } catch (error) {
          console.error('Error:', error);
          // Handle errors appropriately, e.g., display an error message to the user
        }
      });
    }
  return (
    <div>
      <h1>Download Page</h1>
      <button id="downloadButton">Download</button>
    </div>
  );
}

