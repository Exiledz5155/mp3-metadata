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
        _hover={!isClicked && { bg: "brand.300", _dark: { bg: "brand.200" } }}
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
            <Flex>
              <Card>
                {/* row flex */}
                <Flex flexDirection={"row"}>
                  {/* 1'st column flex with image */}
                  <Flex flexDirection={"column"}>
                    <Image
                      src="https://i1.sndcdn.com/artworks-000168416914-fnqzbz-t500x500.jpg"
                      alt="Sample Image"
                      boxSize="200px"
                      objectFit="cover"
                    />

                    <FormControl mt={"1em"} mb={"1em"}>
                      <FormLabel>Year</FormLabel>
                      <Input type="text" name="Year" placeholder="Enter Year" />
                    </FormControl>

                    <FormControl mb={"1em"}>
                      <FormLabel>Genre</FormLabel>
                      <Input
                        type="text"
                        name="genre"
                        placeholder="Enter Genre"
                      />
                    </FormControl>

                    <FormControl mb={"1em"}>
                      <FormLabel>Track</FormLabel>
                      <Input
                        type="text"
                        name="Track"
                        placeholder="Enter Track"
                      />
                    </FormControl>
                  </Flex>
                  {/* 2nd flex with rest of form inputs */}
                  <Flex flexDirection={"column"}>
                    <FormControl ml={"3em"} mt={"2.75em"} mb={"1em"}>
                      <FormLabel>Song Title</FormLabel>
                      <Input
                        type="text"
                        name="Title"
                        placeholder="Enter Song Title"
                      />
                    </FormControl>

                    <FormControl ml={"3em"} mt={"1em"} mb={"1em"}>
                      <FormLabel>Artist(s)</FormLabel>
                      <Input
                        type="text"
                        name="atist"
                        placeholder="Enter Artist(s)"
                      />
                    </FormControl>

                    <FormControl ml={"3em"} mt={"1em"} mb={"1em"}>
                      <FormLabel>Album Title</FormLabel>
                      <Input
                        type="text"
                        name="album title"
                        placeholder="Enter Album Title"
                      />
                    </FormControl>

                    <FormControl ml={"3em"} mt={"1em"} mb={"1em"}>
                      <FormLabel>Album Artist(s)</FormLabel>
                      <Input
                        type="text"
                        name="Album Artist"
                        placeholder="Enter Album Artist(s)"
                      />
                    </FormControl>

                    <Stack
                      ml={"3em"}
                      mt={"1.9em"}
                      align={"center"}
                      spacing={"6em"}
                      direction={"row"}
                    ></Stack>
                  </Flex>
                </Flex>
              </Card>
            </Flex>
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
