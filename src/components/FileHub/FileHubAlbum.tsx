// app/providers.tsx
"use client";

import React, { useEffect, useState } from "react";
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
import { Album, CommonSongProperties, Song } from "../../types/types";
import { MdOutlineQueueMusic } from "react-icons/md";
import { calculateCommonProperties } from "../../util/commonprops";
import { renderImageFromAlbumSmall } from "../../util/generateimage";

export function FileHubAlbum({ album }: { album: Album }) {
  const [imageDisplay, setImageDisplay] = useState<JSX.Element | null>(null);
  const [commonProperties, setCommonProperties] =
    useState<CommonSongProperties>(calculateCommonProperties(album.songs));

  useEffect(() => {
    setCommonProperties(calculateCommonProperties(album.songs));
  }, [album]);

  useEffect(() => {
    setImageDisplay(renderImageFromAlbumSmall(album, commonProperties));
  }, [album, commonProperties]);

  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleHover = () => {
    if (!isClicked) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isClicked) {
      setIsHovered(false);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

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
            {imageDisplay}
            <Text noOfLines={1} maxW={200} align="left">
              {commonProperties.albumTitle}
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
