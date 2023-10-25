"use client";

import {
  Grid,
  GridItem,
  useColorModeValue,
  Center,
  Box,
  Image,
} from "@chakra-ui/react";

export function MusicCard(songData) {
  // Maps the songData passed in as an object containing an array
  // We access the object array with .props
  const music = {
    imageUrl: songData.props[0],
    imageAlt: songData.props[1],
    title: songData.props[2],
    artist: songData.props[3],
  };
  // console.log("music:", props);
  // console.log(songData[0]);
  // console.log(typeof songData);
  return (
    <Box
      maxW="sm%"
      borderWidth="1px"
      borderRadius="lg"
      h="60px"
      overflow="hidden"
    >
      <Grid
        h="100%"
        w="100%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={0}
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg={useColorModeValue("green.400", "gray.900")}
        >
          <Center w="60px" h="60px">
            <Image src={music.imageUrl} alt={music.imageAlt} boxSize="50px" />
          </Center>
        </GridItem>
        <GridItem colSpan={4}>{music.title}</GridItem>
        <GridItem colSpan={4}>{music.artist}</GridItem>
      </Grid>
    </Box>
  );
}
