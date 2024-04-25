"use client";

import {
  HStack,
  VStack,
  Text,
  Image,
  Center,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { Album, Song } from "../../types/types";
import { calculateTotalDuration } from "../../util/duration";
import { calculateCommonProperties } from "../../util/commonprops";
import { MdOutlineQueueMusic } from "react-icons/md";

export function AlbumInfoSection({ album }: { album: Album }) {
  const totalDuration = calculateTotalDuration(album.songs);

  const commonProperties = calculateCommonProperties(album.songs);

  const renderImageDisplay = () => {
    const images = album.songs
      .map((song) => song.image)
      .filter((image) => image);

    if (images.length === 0) {
      return (
        <Center w="200px" h="200px" bg={"brand.200"}>
          <Icon
            as={MdOutlineQueueMusic}
            w={20}
            h={20}
            color="brand.400"
            bg={"brand.200"}
            borderRadius={"5px"}
          />
        </Center>
      );
    }

    if (images.length < 4 || commonProperties.image !== "various") {
      return (
        <Image
          maxW={{ base: "100%", sm: "200px" }}
          src={images[0]}
          alt="Album Cover"
          mr={"20px"}
          borderRadius={"10px"}
        />
      );
    }

    return (
      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={2}
        maxW={{ base: "100%", sm: "200px" }}
        mr={"20px"}
      >
        {images.slice(0, 4).map((image, index) => (
          <GridItem key={index}>
            <Image
              src={image}
              alt={`Album Cover ${index + 1}`}
              objectFit="cover"
              borderRadius="5px"
              boxSize="100%"
            />
          </GridItem>
        ))}
      </Grid>
    );
  };

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
