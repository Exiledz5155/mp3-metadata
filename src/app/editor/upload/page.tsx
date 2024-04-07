"use client";

import UUIDFileUpload from "../../../components/UUIDFileUpload";
import FileUpload from "../../../components/FileHub/FileHub-Upload/FileUpload";
import { Button, Link, chakra } from "@chakra-ui/react";

export default function Upload() {
  return (
    <div>
      <h1>Welcome to the File Upload Page</h1>
      <h2>Currently using UUID Upload</h2>
      <UUIDFileUpload />
      <Link href="/editor/view-uploads">
        <Button>Go to view-uploads</Button>
      </Link>
    </div>
  );
}
