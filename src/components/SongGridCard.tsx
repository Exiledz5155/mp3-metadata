"use client";

import React, { useState } from "react";
import { HStack, Flex, Image, Text } from "@chakra-ui/react";

export function SongGridCard() {
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

  return (
    <HStack
      spacing={4}
      align={"center"}
      borderRadius={"10px"}
      justify={"space-between"}
      _hover={!isClicked && { bg: "brand.300", _dark: { bg: "brand.200" } }}
      onClick={handleClick} // Attach the click event handler
      bg={isClicked ? "brand.300" : isHovered ? "brand.300" : "transparent"} // Update the background color based on isClicked state and hover state
      _dark={{
        bg: isClicked ? "brand.300" : isHovered ? "brand.200" : "transparent",
      }}
      py={"2"}
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
        <Text textAlign={"center"} noOfLines={1}>
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
    </HStack>
  );
}
