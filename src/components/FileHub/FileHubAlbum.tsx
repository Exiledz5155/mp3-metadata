// app/providers.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  HStack,
  Text,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Highlight,
} from "@chakra-ui/react";
import { FileHubAlbumCard } from "./FileHubAlbumCard";
import { Album, CommonSongProperties, Song } from "../../types/types";
import { calculateCommonProperties } from "../../util/commonprops";
import { renderImageFromAlbumSmall } from "../../util/generateimage";

export function FileHubAlbum({
  key,
  album,
  onCardRightClick,
  onAlbumRightClick,
  searchQuery,
  expandedIndices,
  setExpandedIndices,
}: {
  key: number;
  album: Album;
  onCardRightClick: (
    songId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
  onAlbumRightClick: (
    album: Album,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
  searchQuery: string;
  expandedIndices: number[];
  setExpandedIndices: React.Dispatch<React.SetStateAction<number[]>>;
}) {
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
    if (!isClicked) {
      setExpandedIndices((prevIndices) => [...prevIndices, key]);
    } else {
      setExpandedIndices((prevIndices) => prevIndices.filter((i) => i !== key));
    }
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
      <Box onContextMenu={(e) => onAlbumRightClick(album, e)}>
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
            bg={
              expandedIndices.includes(key) || isHovered
                ? "brand.400"
                : "transparent"
            }
            _dark={{
              bg:
                expandedIndices.includes(key) || isHovered
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
                <Highlight
                  query={searchQuery}
                  styles={{
                    bgGradient: "linear(to-r, linear.100, linear.200)",
                    fontWeight: "bold",
                  }}
                >
                  {commonProperties.albumTitle}
                </Highlight>
              </Text>
            </HStack>
          </Box>
        </AccordionButton>
      </Box>
      <AccordionPanel>
        {album.songs.map((song, index) => (
          <FileHubAlbumCard
            key={song.id}
            isLast={index === album.songs.length - 1}
            song={song}
            onRightClick={onCardRightClick}
            searchQuery={searchQuery}
          />
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
}
