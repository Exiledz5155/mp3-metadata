// app/providers.tsx
"use client";

import { AddIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  useColorModeValue,
  Text,
  Input,
  Image,
  Center,
  Box,
  InputGroup,
  InputLeftElement,
  HStack,
  Spacer,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import { FileHubAlbum } from "./FileHubAlbum";
import React, { useRef, useState } from "react";
import { FileUploadBox } from "./FileUploadBox";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny



export function FileHub() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
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
          <InputGroup
            pb="5"
            w="100%"
            bgGradient="linear(to-r, linear.100, linear.200)"
            bgClip={"text"}
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="linear.100" />
            </InputLeftElement>
            <Input placeholder="Search files" borderColor="linear.100" />
          </InputGroup>
          <input type="file" style={{ display: "none" }} />
          <Button
            leftIcon={<AddIcon />} // Change to upload icon MdOutlineFileUpload from figma
            w="100%"
            bgGradient="linear(to-r, linear.100, linear.200)"
            mb={5}
            onClick={() => {
              onOpen();
            }}
          >
            Upload Files
          </Button>
          <FileUploadBox isOpen={isOpen} onClose={onClose} />
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
              left="120px"
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
        </Box>
        <Box overflowY={"auto"}>
          <Accordion
            allowMultiple
            sx={{
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
          >
            <FileHubAlbum />
            <FileHubAlbum />
            <FileHubAlbum />
            <FileHubAlbum />
            <FileHubAlbum />
            <FileHubAlbum />
          </Accordion>
        </Box>
      </CardBody>
    </Card>
  );
}
