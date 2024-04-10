"use client";

import { Button, Card, Heading } from "@chakra-ui/react";
import { useUUID } from "../../contexts/UUIDContext";
import { Link } from "@chakra-ui/next-js";

export default function UploadTest() {
  const { uuid, generateUUID } = useUUID();

  return (
    <Card
      p={"20px"}
      bg="brand.100"
      h="100%"
      rounded={"xl"}
      maxHeight="calc(100vh - 86px)"
      overflow={"hidden"}
    >
      <Heading>UUID: {uuid}</Heading>
      <Button onClick={generateUUID}>Generate New UUID</Button>
      <Link href="/editor/view-uploads">
        <Button>Go to view-uploads</Button>
      </Link>
    </Card>
  );
}
