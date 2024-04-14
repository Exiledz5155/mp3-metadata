"use client";
import React, { useState } from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { Album, Song } from "../../types/types";

export function FileHubAlbumCard({
  song,
  isLast = false,
}: {
  song: Song;
  isLast?: boolean;
}) {
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

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      justifyContent={"space-between"}
      transition="background-color 0.2s ease"
      _hover={
        isClicked ? undefined : { bg: "brand.300", _dark: { bg: "brand.200" } }
      }
      onClick={handleClick}
      borderRadius={"none"}
      borderBottomRadius={isLast ? "lg" : "none"} // If last time in mapped list, add radius
      bg={isClicked ? "brand.300" : isHovered ? "brand.300" : "transparent"} // Update the background color based on isClicked state and hover state
      _dark={{
        bg: isClicked ? "brand.300" : isHovered ? "brand.200" : "transparent",
      }}
      onMouseOver={handleHover} // Attach the hover event handler
      onMouseLeave={handleMouseLeave} // Attach the mouse leave event handler
    >
      <VStack alignItems={"left"} pl={"15px"} py={"5px"} gap={"0px"}>
        <Text fontSize={"15px"} noOfLines={1} pt={"2px"}>
          {song.title}
        </Text>
        <Text fontSize={"10px"} noOfLines={1} pb={"3px"}>
          {song.artist}
        </Text>
      </VStack>
      <Flex alignItems={"center"} pr={"15px"} maxWidth={"40%"}>
        <Text fontFamily={"mono"} fontSize={"15px"}>
          {song.duration}
        </Text>
      </Flex>
    </Flex>
  );
}
