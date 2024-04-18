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
  AspectRatio,
  Box,
  WrapItem,
  Skeleton,
} from "@chakra-ui/react";
import { AlbumDisplayItem } from "./AlbumDisplayItem";
import { useUUID } from "../../contexts/UUIDContext";
import { Album, Song } from "../../types/types";
import { useState, useEffect } from "react";
import React from "react";
import { FileHubAlbum } from "../FileHub/FileHubAlbum";
import { useFetch } from "../../contexts/FetchContext";

// const albumData = require("../../../public/albums.json");

export function AlbumDisplay() {
  const { fetchAlbums } = useFetch();
  const { uuid, generateUUID } = useUUID();
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchAlbumsWrapper = async () => {
      try {
        const albums = await fetchAlbums(uuid);
        setAlbums(albums);
        setIsLoaded(true);
      } catch (error) {
        setError("Failed to fetch albums: " + error.message);
        console.error(error);
        setIsLoaded(true);
      }
    };

    fetchAlbumsWrapper();
  }, [fetchAlbums, uuid]);

  return (
    <Card
      bg="brand.100"
      h="100%"
      rounded={"xl"}
      maxHeight="calc(100vh - 71px)"
      overflow={"hidden"}
    >
      <CardHeader>
        <Heading size="lg" color={"white"}>
          Albums
        </Heading>
      </CardHeader>
      {/* Need to wrap this under the conditional below for scrollbar to not appear */}
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
          {!isLoaded ? (
            // "Lets you group elements without a wrapper node"
            <React.Fragment>
              {Array.from({ length: 20 }, (_, i) => (
                <WrapItem>
                  <AspectRatio w="100%" maxWidth={"200px"} ratio={3 / 4}>
                    <Skeleton
                      key={i}
                      w="100%"
                      h="100%"
                      overflow="hidden"
                      startColor="brand.200"
                      endColor="brand.400"
                      display="flex"
                      boxShadow="2xl" // no effect?
                      rounded="lg"
                      p={"1"}
                      fadeDuration={1}
                    ></Skeleton>
                  </AspectRatio>
                </WrapItem>
              ))}
            </React.Fragment>
          ) : (
            albums &&
            albums.length > 0 &&
            albums.map((album, index) => (
              <AlbumDisplayItem key={index} album={album} />
            ))
          )}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
