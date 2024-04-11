"use client";

import React, { useState } from "react";
import { HStack, Flex, Image, Text, Box } from "@chakra-ui/react";
import ActionMenu from "../Actions/ActionMenu";

interface Song {
  trackNumber: number;
  id: string;
  title: string;
  duration: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  image: string;
}

export function SongGridCard({ song }: { song: Song }) {
  // Use state to track whether the card is right clicked
  const [isRightClicked, setIsRightClicked] = useState(false);
  // x,y coordinates of where the right click menu should be
  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 });
  // State to track hover effect
  const [isHovered, setIsHovered] = useState(false);

  // Function to handle the right click event
  const handleRightClick = (event) => {
    setIsRightClicked(true);
    event.preventDefault(); // Prevents the default right click
    var x = event.clientX;
    var y = event.clientY;
    setRightClickPosition({ x, y }); // Set state to display right-click menu
  };

  // Function to handle hover effect
  const handleHover = () => {
    // Apply hover effect only if the card is not already selected
    if (!isRightClicked) {
      setIsHovered(true);
    }
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    // Remove hover and right click effects
    setIsRightClicked(false);
    setIsHovered(false);
  };

  return (
    <>
      {" "}
      <HStack
        borderRadius={"10px"}
        transition="background-color 0.2s ease"
        onContextMenu={handleRightClick} // Right click event handler
        bg={
          isRightClicked ? "brand.300" : isHovered ? "brand.300" : "transparent"
        } // Update the background color based on isClicked state and hover state
        _dark={{
          bg: isRightClicked
            ? "brand.300"
            : isHovered
            ? "brand.200"
            : "transparent",
        }}
        py={"2"}
        cursor={"pointer"}
        onMouseOver={handleHover} // Attach the hover event handler
        onMouseLeave={handleMouseLeave} // Attach the mouse leave event handler
      >
        {/* TODO: FIX MISALIGNMENT WHEN TRACK NUMBER IS DOUBLE DIGIT */}
        <Flex align={"center"} w="30%">
          {/* <Text fontSize={"md"} mx={"4"}>
            {song.trackNumber}
          </Text> */}
          <Box
            position="relative"
            height="40px"
            minWidth="24px"
            overflow="hidden"
            mr={4}
          >
            <Text
              position="absolute"
              right="0" // aligned to the right edge of the parent box
              top="50%"
              transform="translateY(-50%)" // centers the text vertically
              fontSize="md"
              whiteSpace="nowrap" // ensures the text stays on one line
              overflow="visible" // allows the text to be visible when it overflows
            >
              {song.trackNumber}
            </Text>
          </Box>

          {/* <Box width="30px" mx={"4"} border="1px solid red" textAlign="right">
            <Text fontSize={"md"} isTruncated>
              {song.trackNumber}
            </Text>
          </Box> */}
          <Image
            src={song.image}
            alt={song.title}
            w="50px"
            h="50px"
            borderRadius={"5px"}
            mr={"4"}
          />
          <Text textAlign={"left"} noOfLines={1}>
            {song.title}
          </Text>
        </Flex>
        <Text textAlign={"left"} noOfLines={1} w="30%">
          {song.artist}
        </Text>
        <Text textAlign={"left"} noOfLines={1} w="30%">
          {song.album}
        </Text>
        <Text textAlign={"center"} noOfLines={1} fontFamily={"mono"} w="10%">
          {song.duration}
        </Text>

        {/* Render right-click menu when a song card is right clicked */}
        {isRightClicked && (
          <ActionMenu
            position={rightClickPosition}
            onClose={() => setIsRightClicked(false)}
            song={song}
          />
        )}
      </HStack>
    </>
  );
}
