"use client";

import {
  Grid,
  GridItem,
  useColorModeValue,
  Center,
  Box,
  Image,
  Checkbox,
  CheckboxGroup,
} from "@chakra-ui/react";

export function MusicCardTemp(songData) {
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
    <Box w="100%" borderWidth="1px" h="60px" overflow="hidden">
      <Grid
        h="100%"
        w="100%"
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(10, 1fr)"
        gap={0}
      >
        <GridItem rowSpan={3} colSpan={1}>
          <Checkbox colorScheme="green" defaultChecked />
        </GridItem>
        <GridItem rowSpan={2} colSpan={1}>
          <Center w="60px" h="60px">
            <Image src={music.imageUrl} alt={music.imageAlt} boxSize="50px" />
          </Center>
        </GridItem>
        <GridItem colSpan={2} rowSpan={2}>
          {music.title}
        </GridItem>
        <GridItem colSpan={2} rowSpan={2}>
          {music.artist}
        </GridItem>
      </Grid>
    </Box>
  );
}
