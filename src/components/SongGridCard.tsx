"use client";

import React, { useState } from "react";
import { HStack, Flex, Image, Text, useDisclosure } from "@chakra-ui/react";
import { Edit } from "./Edit";

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {" "}
      <HStack
        borderRadius={"10px"}
        onClick={onOpen} // Attach the click event handler
        transition="background-color 0.2s ease"
        bg={isClicked ? "brand.300" : isHovered ? "brand.300" : "transparent"} // Update the background color based on isClicked state and hover state
        _dark={{
          bg: isClicked ? "brand.300" : isHovered ? "brand.200" : "transparent",
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
      <Edit isOpen={isOpen} onClose={onClose} />
    </>
  );
}
