"use client";

import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Spinner } from "@chakra-ui/react";

export default function Albums() {
  const [albums, setAlbums] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Start with loading true
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getJSON");
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
      overflow="hidden"
    >
      <VStack spacing="20px" align="stretch">
        {albums}
        {/* Once a json object gets displayed uncomment this */}
        {/* {albums && albums.length > 0 ? (
          albums.map((album, index) => (
            <Box key={index} p="10px" bg="white" rounded="md">
              <Text fontWeight="bold">{album.album}</Text>
              <Text>{album.artist}</Text>
              {album.songs.map((song, songIndex) => (
                <Text key={songIndex}>
                  {song.trackNumber}. {song.title} - {song.duration}
                </Text>
              ))}
            </Box>
          ))
        ) : (
          <Text>No albums found</Text>
        )} */}
      </VStack>
    </Box>
  );
}
