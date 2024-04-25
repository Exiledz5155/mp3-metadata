// app/providers.tsx
"use client";

import React, { useState } from "react";
import {
  Box,
  Center,
  HStack,
  Image,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Skeleton,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { FileHubAlbumCard } from "./FileHubAlbumCard";
import { Album, Song } from "../../types/types";
import { MdOutlineQueueMusic } from "react-icons/md";
import { calculateCommonProperties } from "../../util/commonprops";

export function FileHubAlbum({ album }: { album: Album }) {
  // Use state to track whether the card is clicked
  const [isClicked, setIsClicked] = useState(false);
  // Function to handle the click event
  const handleClick = () => {
    // Toggle the isClicked state when the card is clicked
    setIsClicked(!isClicked);
  };
  // Function to handle hover effect
  const handleHover = () => {
    // Apply hover effect only if the card is not already selected
    if (!isClicked) {
      setIsHovered(true);
    }
  };
  // Function to handle mouse leave
  const handleMouseLeave = () => {
    // Remove hover effect only if the card is not already selected
    if (!isClicked) {
      setIsHovered(false);
    }
  };

  // State to track hover effect
  const [isHovered, setIsHovered] = useState(false);

  const renderImageDisplay = () => {
    const images = album.songs
      .map((song) => song.image)
      .filter((image) => image);

    if (images.length === 0) {
      return (
        <Center w="55px" h="55px" bg={"brand.200"}>
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

    const commonProperties = calculateCommonProperties(album.songs);

    if (images.length < 4 || commonProperties.image !== "various") {
      return (
        <Center w="55px" h="55px">
          <Image
            src={images[0]}
            alt={"Album Image Cover"}
            borderRadius="base"
            boxSize="45px"
          />
        </Center>
      );
    }

    return (
      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={1}
        w="55px"
        h="55px"
      >
        {images.slice(0, 4).map((image, index) => (
          <GridItem key={index}>
            <Image
              src={image}
              alt={`Album Image Cover ${index + 1}`}
              objectFit="cover"
              borderRadius="base"
              boxSize="100%"
            />
          </GridItem>
        ))}
      </Grid>
    );
  };

  return (
    <AccordionItem>
      <AccordionButton>
        <Box
          as="button"
          w="100%"
          borderTopRadius={"lg"}
          borderBottomRadius={isClicked ? "none" : "lg"}
          h="55px"
          overflow="hidden"
          transition="background-color 0.2s ease"
          _hover={
            isClicked
              ? undefined
              : { bg: "brand.400", _dark: { bg: "brand.300" } }
          }
          onClick={handleClick} // Attach the click event handler
          bg={isClicked ? "brand.400" : isHovered ? "brand.400" : "transparent"} // Update the background color based on isClicked state and hover state
          _dark={{
            bg: isClicked
              ? "brand.400"
              : isHovered
              ? "brand.300"
              : "transparent",
          }}
          cursor={"pointer"}
          onMouseOver={handleHover} // Attach the hover event handler
          onMouseLeave={handleMouseLeave} // Attach the mouse leave event handler
        >
          <HStack spacing="10px">
            {/* <Center w="55px" h="55px">
              <Image
                src={album.songs[0].image}
                alt={"Album Image Cover"}
                borderRadius="base"
                boxSize="45px"
              />
            </Center> */}
            {renderImageDisplay()}
            <Text noOfLines={1} maxW={200} align="left">
              {album.album}
            </Text>
          </HStack>
        </Box>
      </AccordionButton>
      <AccordionPanel>
        {album.songs.map((song, index) => (
          <FileHubAlbumCard
            key={song.id}
            isLast={index === album.songs.length - 1}
            song={song}
          />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
}
