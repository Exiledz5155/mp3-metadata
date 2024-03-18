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
    const x = event.clientX;
    const y = event.clientY;
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
    <HStack
      spacing={4}
      align={"center"}
      borderRadius={"10px"}
      justify={"space-between"}
      // _hover={!isRightClicked && { bg: "brand.300", _dark: { bg: "brand.200" } }}
      onContextMenu={handleRightClick} // Right click event handler
      bg={isRightClicked ? "brand.300" : isHovered ? "brand.200" : "transparent"} // Update the background color based on isClicked state and hover state
      // _dark={{
      //   bg: isRightClicked ? "brand.300" : isHovered ? "brand.200" : "transparent",
      // }}
      py={"1"}
      cursor={"pointer"}
      onMouseOver={handleHover} // Attach the hover event handler
      onMouseLeave={handleMouseLeave} // Attach the mouse leave event handler
    >
      <Flex align={"center"}>
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
        <Text textAlign={"center"} noOfLines={1} maxWidth={"50%"}>
          Intro
        </Text>
      </Flex>
      <Text textAlign={"center"} noOfLines={1}>
        Juice WRLD
      </Text>
      <Text textAlign={"center"} noOfLines={1}>
        Goodbye & Good Riddance
      </Text>
      <Text
        textAlign={"center"}
        mr={"4"}
        noOfLines={1}
        fontFamily={"mono"}
        letterSpacing={"-10%"}
      >
        1:14
      </Text>

      {/* Render right-click menu when a song card is right clicked */}
      {isRightClicked && (
        <SongGridCardRightClick 
          position={ rightClickPosition }
          onClose={ () => setIsRightClicked(false) } 
        />)
      }
    </HStack>
  );
}
