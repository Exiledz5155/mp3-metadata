"use client";

import React, { useState } from "react";
import {
  HStack,
  Flex,
  Image,
  Text,
  ModalContent,
  ModalOverlay,
  Modal,
  ModalFooter,
  Button,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Card,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useColorModeValue,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

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
        spacing={4}
        align={"center"}
        borderRadius={"10px"}
        justify={"space-between"}
        onClick={onOpen} // Attach the click event handler
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
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              h="sm"
              templateRows="repeat(30, 1fr)"
              templateColumns="repeat(34, 1fr)"
              gap={4}
            >
              <GridItem rowSpan={12} colSpan={12}>
                {" "}
                <Image
                  src="https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
                  alt="Album Cover"
                  borderRadius={"5px"}
                />
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Song Title</FormLabel>
                  <Input variant="unstyled" />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Artist(s)</FormLabel>
                  <Input variant="unstyled" />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Year</FormLabel>
                  <Input variant="unstyled" />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Album Title</FormLabel>
                  <Input variant="unstyled" />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Genre</FormLabel>
                  <Input variant="unstyled" />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Album Artist(s)</FormLabel>
                  <Input variant="unstyled" />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Track</FormLabel>
                  <Input variant="unstyled" />
                </FormControl>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<CheckIcon />}
              colorScheme="blue"
              // isLoading
              // loadingText={'Submitting'}
              mr={3}
              size="md"
              variant="solid"
            >
              Save
            </Button>
            <Button
              leftIcon={<CloseIcon />}
              colorScheme="blue"
              size="md"
              variant="outline"
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
