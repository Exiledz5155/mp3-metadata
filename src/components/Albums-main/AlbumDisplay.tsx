// app/providers.tsx
"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Card,
  CardHeader,
  Heading,
  CardBody,
  Divider,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";
import { AlbumDisplayItem } from "./AlbumDisplayItem";
const albumData = require("../../../public/albums.json");

export function AlbumDisplay() {
  return (
    <Card
      bg="brand.100"
      h="100%"
      rounded={"xl"}
      maxHeight="calc(100vh - 71px)"
      overflow={"hidden"}
    >
      <CardHeader>
        <Heading size="lg">Albums</Heading>
      </CardHeader>
      <CardBody
        overflowY={"auto"}
        pt={"0"}
        css={{
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Divider mb={"20px"} p={"0"} />
        <SimpleGrid minChildWidth="150px" spacing="15px">
          {albumData.map((album, index) => (
            <AlbumDisplayItem key={index} album={album} />
          ))}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
