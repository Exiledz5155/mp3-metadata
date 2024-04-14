import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useUUID } from "../../contexts/UUIDContext";
import { Link } from "@chakra-ui/next-js";

export default function UploadTest() {
  const { uuid, generateUUID } = useUUID();
  const [files, setFiles] = useState<FileList | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(fileList);
    }
  };

  const handleUpload = async () => {
    // Mark function as async
    if (files) {
      for (const file of Array.from(files)) {
        // Use for...of loop to use await inside
        // Check if the file has .mp3 extension
        if (!file.name.endsWith(".mp3")) {
          console.error(`Error: File ${file.name} is not a .mp3 file.`);
          continue; // Skip this file
        }

        console.log("Uploading file:", file);
        const response = await uploadFile(file, uuid); // Wait for uploadFile to finish

        // Check if the upload was successful
        if (response.ok) {
          console.log("File uploaded successfully");
        }
      }
    } else {
      console.log("No files selected.");
    }
  };

  return (
    <Card
      p={"20px"}
      bg="brand.100"
      h="100%"
      rounded={"xl"}
      maxHeight="calc(100vh - 86px)"
      overflow={"hidden"}
    >
      <CardHeader>
        <Heading as="h3" size="lg">
          Current UUID: {uuid}
        </Heading>
      </CardHeader>
      <CardBody>
        <Button onClick={generateUUID}>Generate new UUID</Button>
        {/* Input for file selection */}
        {/* <Button as="label" htmlFor="fileInput" cursor="pointer">
          Upload Files
          <input
            id="fileInput"
            type="file"
            multiple
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </Button>
        <Button onClick={handleUpload} disabled={!files}>
          Upload Selected Files
        </Button> */}
        {/* Display selected file names */}
        {/* {files && (
          <Text>
            Current Files selected:{" "}
            {Array.from(files).map((file) => (
              <Text key={file.name}>{file.name}</Text> // Added key prop
            ))}
          </Text>
        )} */}
      </CardBody>
      <CardFooter>
        {/* <Link href="/editor/view-uploads">
          <Button>Go to view-uploads</Button>
        </Link> */}
      </CardFooter>
    </Card>
  );
}

async function uploadFile(file: File, userUUID: string): Promise<Response> {
  // create file path using userUUID and file name
  const userFilePath = `${userUUID}/${encodeURIComponent(file.name)}`;
  // Use fetch to call SAS API route with file path as param
  const response = await fetch(`/api/upload?fileName=${userFilePath}`);

  const { blobUrl, sasToken } = await response.json();
  // Create full URL
  const fullBlobUrl = `${blobUrl}?${sasToken}`;

  // Set up request options
  const requestOptions: RequestInit = {
    method: "PUT",
    headers: {
      "x-ms-blob-type": "BlockBlob",
      // Add other headers as needed
    },
    body: file,
  };

  // Perform the fetch request
  const uploadResponse = await fetch(fullBlobUrl, requestOptions);

  // Check if the request was successful
  if (!uploadResponse.ok) {
    throw new Error("Failed to upload file");
  }

  return uploadResponse;
}
