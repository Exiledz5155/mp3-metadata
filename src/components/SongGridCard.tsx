"use client";

import React, { useState } from "react";
import { HStack, Flex, Image, Text } from "@chakra-ui/react";
import { SongGridCardRightClick } from "./SongGridCardRightClick";

export function SongGridCard() {
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
        <Flex align={"center"} w="30%">
          <Text fontSize={"md"} ml={"4"}>
            1
          </Text>
          <Image
            src="https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
            alt="Album Cover"
            w="50px"
            h="50px"
            borderRadius={"5px"}
            mx={"4"}
          />
          <Text textAlign={"center"} noOfLines={1}>
            Intro
          </Text>
        </Flex>
        <Text textAlign={"left"} noOfLines={1} w="30%">
          Juice WRLD
        </Text>
        <Text textAlign={"left"} noOfLines={1} w="30%">
          Goodbye & Good Riddance
        </Text>
        <Text textAlign={"center"} noOfLines={1} fontFamily={"mono"} w="10%">
          1:14
        </Text>
      </HStack>
      {/* Render right-click menu when a song card is right clicked */}
      {isRightClicked && (
        <SongGridCardRightClick
          position={rightClickPosition}
          onClose={() => setIsRightClicked(false)}
        />
      )}
    </>
  );
}
