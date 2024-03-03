"use client";

import { Button } from "@chakra-ui/react";
import Link from "next/link";
import UploadedFilesList from "../../../components/viewUploads"; // Adjust the path based on your file structure

export default function viewUploads() {
  // Bug for frontend to fix:
  // Might not be relevant to fix at later, but the + icon for upload files
  // In filehub is shifted to the left
  return (
    <div>
      <h1>Welcome to the Uploaded Files List Page </h1>
      <UploadedFilesList />
      <Link href="/editor/upload">
        <Button>Go to upload</Button>
      </Link>
    </div>
  );
}
