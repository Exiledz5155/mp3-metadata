"use client";

import UUIDFileUpload from "../../../components/Testing/UUIDFileUpload";
import FileUpload from "../../../components/Testing/FileUpload";
import { Button, Link, chakra } from "@chakra-ui/react";
import UploadTest from "../../../components/Testing/UploadTest";

export default function uuid() {
  return (
    <UploadTest></UploadTest>
    // <div>
    //   <h1>Welcome to the File Upload Page</h1>
    //   <h2>Currently using UUID Upload</h2>
    //   <UUIDFileUpload />
    //   <Link href="/editor/view-uploads">
    //     <Button>Go to view-uploads</Button>
    //   </Link>
    // </div>
  );
}
