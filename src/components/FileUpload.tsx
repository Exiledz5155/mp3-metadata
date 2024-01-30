"use client"
import React, { useState } from 'react';

interface FileUploadProps {
    onUploadSuccess?: (response: Response) => void;
    onUploadFailure?: (error: Error) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess, onUploadFailure }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (selectedFile) {
            try {
                const response = await uploadFile(selectedFile);
                if (response.ok) {
                    console.log('File uploaded successfully');
                    if (onUploadSuccess) onUploadSuccess(response);
                } else {
                    throw new Error('Upload failed');
                }
            } catch (error) {
                console.error(error);
                if (onUploadFailure && error instanceof Error) onUploadFailure(error);
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
    const response = await fetch('/api/generateSasToken');
    const { blobUrl, sasToken } = await response.json();

    const blobName = "test.mp3" //Workaround for now this is supposed to be coming in with blobName

    const fullBlobUrl = `${blobUrl}/${blobName}?${sasToken}`;
    console.log("blob url:", blobUrl) //DELETE ME
    console.log("full url:", fullBlobUrl) //logging. DELETE ME
    const requestOptions: RequestInit = {
        method: 'PUT',
        headers: {
            'x-ms-blob-type': 'BlockBlob',
        },
        body: file,
    };

    return fetch(fullBlobUrl, requestOptions);
}
