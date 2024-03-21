"use client";

import { HStack, VStack, Text, Image } from "@chakra-ui/react";

interface Song {
  id: string;
  title: string;
  duration: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  image: string;
}

interface AlbumObj {
  album: string;
  artist: string;
  albumArtURL: string;
  year: number;
  genre: string;
  songs: Song[];
}

export function AlbumInfoSection({ album }: { album: AlbumObj }) {
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
        src={album.albumArtURL}
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
