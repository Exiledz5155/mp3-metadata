"use client";

import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  WrapItem,
  useColorModeValue,
  Text,
  Image,
  Center,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { Album, Song } from "../../types/types";
import { MdOutlineQueueMusic } from "react-icons/md";
import { calculateCommonProperties } from "../../util/commonprops";

// Remove this and add to func header instead
interface AlbumDisplayItemProps {
  album: Album;
}

export function AlbumDisplayItem({ album }: AlbumDisplayItemProps) {
  const commonProperties = calculateCommonProperties(album.songs);
  const renderImageDisplay = () => {
    const images = album.songs
      .map((song) => song.image)
      .filter((image) => image);

    if (images.length === 0) {
      return (
        <Center w="100%" h="100%" bg={"brand.200"}>
          <Icon
            as={MdOutlineQueueMusic}
            w={10}
            h={10}
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
          src={images[0]}
          p={2}
          borderRadius={"15"}
          alt={"Album Cover"}
          w="100%"
        />
      );
    }

    return (
      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={1}
        p={2}
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
    <WrapItem>
      <AspectRatio w="100%" maxWidth={"200px"} ratio={3 / 4}>
        <Box
          as="button"
          w="100%"
          h="100%"
          overflow="hidden"
          transition="box-shadow 0.3s ease, border 0.3s ease"
          _hover={{
            boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
            // Remove or comment out the background changes to focus on the glow effect
            bg: "brand.300",
          }}
          bg={useColorModeValue("white", "brand.200")}
          display="flex"
          boxShadow="2xl" // no effect?
          rounded="lg"
          p={"1"}
        >
          <Link
            href={`/editor/${encodeURIComponent(commonProperties.albumTitle)}`}
            passHref
          >
            <Grid
              templateRows="repeat(8, 1fr)"
              templateColumns="repeat(6, 1fr)"
            >
              <GridItem rowSpan={6} colSpan={6}>
                {renderImageDisplay()}
              </GridItem>
              <GridItem colSpan={6} rowSpan={1} pl={2} pr={2}>
                <Text as="b" align="left" noOfLines={1}>
                  {commonProperties.albumTitle}
                </Text>
              </GridItem>
              {/* TODO: NOT ENOUGH EMPTY SPACE BELOW JUICE WLRD TEXT */}
              {/* i.e, empty space between contents and border is not even all around */}
              <GridItem colSpan={6} rowSpan={1} pl={2} pr={2}>
                <Text align="left" noOfLines={1}>
                  {commonProperties.albumArtist}
                </Text>
              </GridItem>
            </Grid>
          </Link>
        </Box>
      </AspectRatio>
    </WrapItem>
  );
}
