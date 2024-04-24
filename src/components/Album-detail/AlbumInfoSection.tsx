"use client";

import { HStack, VStack, Text, Image } from "@chakra-ui/react";
import { Album, Song } from "../../types/types";
import { calculateTotalDuration } from "../../util/duration";
import { calculateCommonProperties } from "../../util/commonprops";

export function AlbumInfoSection({ album }: { album: Album }) {
  const totalDuration = calculateTotalDuration(album.songs);

  const commonProperties = calculateCommonProperties(album.songs);

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
          {commonProperties.albumTitle}
          {/* {album.album} */}
        </Text>
        <Text fontSize={"xl"} as="b" noOfLines={1}>
          {commonProperties.albumArtist}
        </Text>
        <Text fontSize={"md"} as="b" noOfLines={1}>
          {commonProperties.year} • {album.songs.length} songs • {totalDuration}
        </Text>
      </VStack>
    </HStack>
  );
}
