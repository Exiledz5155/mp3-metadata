"use client";

import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Link,
  WrapItem,
  useColorModeValue,
  Text,
  Image,
  Fade,
} from "@chakra-ui/react";

interface musicObj {
  id: string;
  title: string;
  artist: string;
  album: string;
  "album-artist": string;
  composer: string;
  genre: string;
  year: number;
  "track-num": number;
  "track-total": number;
  "disc-num": number;
  "disc-total": number;
  compilation: boolean;
  rating: number;
  bpm: number;
  artwork: string;
  "song-duration": number;
}

export function AlbumDisplayItem(songData: musicObj) {
  const album = {
    imageUrl: songData.artwork,
    title: songData.album,
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
          <Link href="./album-view" _hover={{ textDecoration: "none" }}>
            <Grid
              templateRows="repeat(8, 1fr)"
              templateColumns="repeat(6, 1fr)"
            >
              <GridItem rowSpan={6} colSpan={6}>
                <Image
                  src={songData.artwork}
                  p={2}
                  borderRadius={"15"}
                  alt={"An Image"}
                  w="100%"
                />
              </GridItem>
              <GridItem colSpan={6} rowSpan={1} pl={2} pr={2}>
                <Text as="b" align="left" noOfLines={1}>
                  {songData.album}
                </Text>
              </GridItem>
              {/* TODO: NOT ENOUGH EMPTY SPACE BELOW JUICE WLRD TEXT */}
              {/* i.e, empty space between contents and border is not even all around */}
              <GridItem colSpan={6} rowSpan={1} pl={2} pr={2}>
                <Text align="left" noOfLines={1}>
                  {songData["album-artist"]}
                </Text>
              </GridItem>
            </Grid>
          </Link>
        </Box>
      </AspectRatio>
    </WrapItem>
  );
}
