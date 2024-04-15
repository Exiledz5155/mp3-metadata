"use client";

import { HStack, VStack, Text, Image } from "@chakra-ui/react";
import { Album, Song } from "../../types/types";

export function AlbumInfoSection({ album }: { album: Album }) {
  // REFACTOR
  // Function to calculate total duration
  const calculateTotalDuration = (songs: Song[]) => {
    const totalSeconds = songs.reduce((acc, song) => {
      const [minutes, seconds] = song.duration.split(":").map(Number);
      return acc + minutes * 60 + seconds;
    }, 0);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    // Format duration string
    return `${hours > 0 ? `${hours} hr ` : ""}${minutes} min ${seconds} sec`;
  };

  const totalDuration = calculateTotalDuration(album.songs);

  return (
    <HStack align={"start"}>
      <Image
        maxW={{ base: "100%", sm: "200px" }}
        src={album.songs[0].image}
        alt="Album Cover"
        mr={"20px"}
        borderRadius={"10px"}
      />
      <VStack align={"start"} w={"100%"}>
        <Text fontSize={"4xl"} as="b" noOfLines={1}>
          {album.album}
        </Text>
        <Text fontSize={"xl"} as="b" noOfLines={1}>
          {album.artist}
        </Text>
        <Text fontSize={"md"} as="b" noOfLines={1}>
          {album.year} • {album.songs.length} songs • {totalDuration}
        </Text>
      </VStack>
    </HStack>
  );
}
