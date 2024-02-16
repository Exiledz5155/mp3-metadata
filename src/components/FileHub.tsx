// app/providers.tsx
"use client";

import { AddIcon, SearchIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { FileHubAlbum } from "./FileHubAlbum";
import React, { useRef } from "react";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export function FileHub() {
  return (
    <Card
      bg={useColorModeValue("white", "brand.100")}
      h={"100%"}
      maxH={"93.25vh"}
      p={"20px"}
      rounded={"xl"}
    >
      <CardBody overflow={"hidden"} p={"0"} display={'flex'} flexDirection={'column'}>
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
            leftIcon={<AddIcon />}
            w="100%"
            bgGradient="linear(to-r, linear.100, linear.200)"
            mb={5}
          >
            Upload Files
          </Button>
        </Box>
        <Box overflowY={"auto"} >
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
