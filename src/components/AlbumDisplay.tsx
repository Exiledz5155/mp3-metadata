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
import { useState, useEffect } from "react";
import { AlbumDisplayItem } from "./AlbumDisplayItem";
const albumData = require("../../public/albums.json");

export function AlbumDisplay() {
  return (
    <Card
      bg={useColorModeValue("white", "brand.100")}
      h="100%"
      rounded={"xl"}
      maxH={"93.25vh"}
      overflow={"hidden"}
    >
      <CardHeader>
        <Heading size="lg">Albums</Heading>
      </CardHeader>
      <CardBody overflowY={"auto"} pt={"0"}>
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
