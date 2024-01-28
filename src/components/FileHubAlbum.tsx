// app/providers.tsx
"use client";

import React, { useState } from "react";
import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";

export function FileHubAlbum() {
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
    <Box pb={1}>
      <Box
        as="button"
        w="100%"
        borderRadius="lg"
        h="55px"
        overflow="hidden"
        _hover={!isClicked && { bg: "brand.300", _dark: { bg: "brand.200" } }}
        onClick={handleClick} // Attach the click event handler
        bg={isClicked ? "brand.300" : isHovered ? "brand.300" : "transparent"} // Update the background color based on isClicked state and hover state
        _dark={{
          bg: isClicked ? "brand.300" : isHovered ? "brand.200" : "transparent",
        }}
        cursor={"pointer"}
        onMouseOver={handleHover} // Attach the hover event handler
        onMouseLeave={handleMouseLeave} // Attach the mouse leave event handler
      >
        <HStack spacing="10px">
          <Center w="55px" h="55px">
            <Image
              src={
                "https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
              }
              alt={"An Image"}
              borderRadius="base"
              boxSize="45px"
            />
          </Center>
          <Text noOfLines={1} maxW={200} align="left">
            Goodbye & Good Riddance
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}
