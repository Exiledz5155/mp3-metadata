"use client";

import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";
import { SongGridCard } from "../Album-detail/SongGridCard";
import { useUUID } from "../../contexts/UUIDContext";

interface Song {
  trackNumber: number;
  id: string;
  title: string;
  duration: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  image: string;
}

interface Album {
  album: string;
  artist: string;
  songs: Song[];
}

export default function Albums() {
  const { uuid, generateUUID } = useUUID();
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/albums?uuid=${uuid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAlbums(data);
      } catch (e) {
        setError("Failed to fetch albums: " + e.message);
        console.error(e);
      } finally {
        setIsLoading(false); // Set loading to false when the operation is complete
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <Box
        p="20px"
        bg="brand.100"
        h="100%"
        rounded="xl"
        maxHeight="calc(100vh - 86px)"
        overflow="hidden"
      >
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        p="20px"
        bg="brand.100"
        h="100%"
        rounded="xl"
        maxHeight="calc(100vh - 86px)"
        overflow="hidden"
      >
        <Text>{error}</Text>
      </Box>
    );
  }

  return (
    <Box
      p="20px"
      bg="brand.100"
      h="100%"
      rounded="xl"
      maxHeight="calc(100vh - 86px)"
      overflow="auto"
    >
      <VStack spacing="20px" align="stretch" overflow={"auto"}>
        {albums && albums.length > 0 ? (
          albums.map((album, index) => (
            <Box>
              {album.songs.map((song, index) => (
                <SongGridCard
                  key={index} // Assuming each song has a unique ID
                  song={song}
                  // isLast={index === album.songs.length - 1}
                />
              ))}
            </Box>
          ))
        ) : (
          <Text>No albums found</Text>
        )}
      </VStack>
    </Box>
  );
}
