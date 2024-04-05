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
} from "@chakra-ui/react";
import { FileHubAlbum } from "./FileHubAlbum";
import React, { useState } from "react";
import { FileUploadBox } from "./FileUploadBox";
import { IoCloudUploadOutline } from "react-icons/io5";
import { SongGridCardRightClick } from "./SongGridCardRightClick";
const albumData = require("../../public/albums.json");

export function FileHub() {
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
      maxH={"93.25vh"}
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
          {/* BUG FIX CARET NOT UPDATING AFTER TEXT REACHS END OF INPUT BOX */}
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
            {albumData.map((album, index) => (
              <FileHubAlbum key={index} album={album} />
            ))}
            {isRightClicked && (
              <SongGridCardRightClick
                position={rightClickPosition}
                onClose={() => setIsRightClicked(false)}
              />
            )}
          </Accordion>
        </Box>
      </CardBody>
    </Card>
  );
}
