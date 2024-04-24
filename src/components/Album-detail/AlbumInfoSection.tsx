"use client";

import { HStack, VStack, Text, Image } from "@chakra-ui/react";
import { Album, Song } from "../../types/types";
import { calculateTotalDuration } from "../../util/duration";

export function AlbumInfoSection({ album }: { album: Album }) {
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
