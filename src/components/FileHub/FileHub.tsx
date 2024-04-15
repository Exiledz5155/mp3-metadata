// app/providers.tsx
"use client";

import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  useColorModeValue,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  Accordion,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  useDisclosure,
  HStack,
  Text,
  Skeleton,
  AccordionButton,
  AccordionItem,
  Image,
  Center,
} from "@chakra-ui/react";
import { FileHubAlbum } from "./FileHubAlbum";
import React, { useEffect, useState } from "react";
import FileUploadBox from "./FileHub-Upload/UploadBox";
import { IoCloudUploadOutline } from "react-icons/io5";
import ActionMenu from "../Actions/ActionMenu";
import { useUUID } from "../../contexts/UUIDContext";
import { Album, Song } from "../../types/types";

// hardcode data
// const albumData = require("../../../public/albums.json");

export function FileHub() {
  const { uuid, generateUUID } = useUUID();
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/albums?uuid=${uuid}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // console.log(response);
        // const responseText = await response.text();
        // console.log(responseText);
        const data = await response.json();

        setAlbums(data);
        setisLoaded(true);
      } catch (e) {
        setError("Failed to fetch albums: " + e.message);
        console.error(e);
      }
    };

    fetchData();
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Use state to track whether the card is right clicked
  const [isRightClicked, setIsRightClicked] = useState(false);
  // x,y coordinates of where the right click menu should be
  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 });

  // Function to handle the right click event
  const handleRightClick = (event) => {
    setIsRightClicked(true);
    event.preventDefault(); // Prevents the default right click
    var x = event.clientX;
    var y = event.clientY;
    setRightClickPosition({ x, y }); // Set state to display right-click menu
  };

  return (
    <Card
      bg={useColorModeValue("white", "brand.100")}
      h={"100%"}
      maxHeight="calc(100vh - 71px)"
      p={"20px"}
      rounded={"xl"}
    >
      <CardBody
        overflow={"hidden"}
        p={"0"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box bg="brand.100">
          <InputGroup
            pb="5"
            w="100%"
            sx={{
              caretColor: "white",
            }}
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="linear.100" />
            </InputLeftElement>
            <Input
              color="linear.100"
              placeholder="Search files"
              borderColor="linear.100"
              _hover={{ borderColor: "linear.100" }}
              _focus={{
                borderColor: "linear.100",
                boxShadow: "none",
              }}
              type="text"
            />
          </InputGroup>

          <Button
            leftIcon={<IoCloudUploadOutline size="24px" />}
            w="100%"
            bgGradient="linear(to-r, linear.100, linear.200)"
            _hover={{ color: "white", bg: "brand.300" }}
            color={"brand.200"}
            mb={5}
            onClick={() => {
              onOpen();
            }}
          >
            Upload Files
          </Button>
          <FileUploadBox isOpen={isOpen} onClose={onClose} />
          <HStack justifyContent={"space-between"}>
            <Menu closeOnSelect={false}>
              <MenuButton
                as={Button}
                variant="ghost"
                h="30px"
                w="70px"
                bottom="10px"
              >
                Filter
              </MenuButton>
              <MenuList bg="brand.100">
                <MenuOptionGroup type="checkbox">
                  <MenuItemOption bg="brand.100" _hover={{ bg: "brand.200" }}>
                    Genre
                  </MenuItemOption>
                  <MenuItemOption bg="brand.100" _hover={{ bg: "brand.200" }}>
                    Year
                  </MenuItemOption>
                </MenuOptionGroup>
              </MenuList>
            </Menu>
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                h="30px"
                w="100px"
                bottom="10px"
              >
                Sort By:
                <ChevronDownIcon />
              </MenuButton>
              <MenuList bg="brand.100">
                <MenuItem bg="brand.100" _hover={{ bg: "brand.200" }}>
                  A-Z
                </MenuItem>
                <MenuItem bg="brand.100" _hover={{ bg: "brand.200" }}>
                  Artist
                </MenuItem>
                <MenuItem bg="brand.100" _hover={{ bg: "brand.200" }}>
                  Recently Added
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Box>
        <Box
          overflowY={"auto"}
          css={{
            display: "flex", // Set display to flex
            flexDirection: "column", // Arrange children in a column
            alignItems: "flex-start", // Align children to the start of the flex container
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}
        >
          <Accordion
            allowMultiple
            sx={{
              width: "100%",
              ".chakra-accordion__item": {
                borderTop: "none",
                borderBottom: "none",
                borderBottomRadius: "lg", // WORKS BUT DOESN'T AFFECT ALBUMCARD
                padding: "0", // Remove padding from accordion item
                margin: "0", // Remove margin from accordion item
              },
              ".chakra-accordion__button": {
                padding: "0", // Remove padding from accordion button
              },
              ".chakra-accordion__panel": {
                padding: "0", // Remove padding from accordion panel
              },
              ".chakra-accordion__button:focus": {
                boxShadow: "none",
              },
            }}
            onContextMenu={handleRightClick}
          >
            {!isLoaded ? (
              // "Lets you group elements without a wrapper node"
              <React.Fragment>
                {Array.from({ length: 10 }, (_, i) => (
                  <Box key={i} borderRadius={"lg"} h="55px" overflow="hidden">
                    <HStack spacing="10px">
                      <Center w="55px" h="55px">
                        {/* UPDATE TO KEEP CHECKING FOR FIRST IMAGE */}
                        <Skeleton
                          borderRadius="base"
                          boxSize="45px"
                          startColor="brand.200"
                          endColor="brand.400"
                          fadeDuration={1}
                        >
                          <Image
                            src={
                              "https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
                            }
                            borderRadius="base"
                            boxSize="45px"
                          />
                        </Skeleton>
                      </Center>
                      <Skeleton
                        noOfLines={1}
                        maxW={200}
                        startColor="brand.200"
                        endColor="brand.400"
                        fadeDuration={1}
                      >
                        Placeholder Album Title Placeholder Album Title
                        Placeholder Album Title Placeholder Album Title
                        Placeholder Album Title
                      </Skeleton>
                    </HStack>
                  </Box>
                ))}
              </React.Fragment>
            ) : (
              albums &&
              albums.length > 0 &&
              albums.map((album, index) => (
                <FileHubAlbum key={index} album={album} />
              ))
            )}

            {/* {isRightClicked && (
              <ActionMenu
                position={rightClickPosition}
                onClose={() => setIsRightClicked(false)}
              />
            )} */}
          </Accordion>
        </Box>
      </CardBody>
    </Card>
  );
}
