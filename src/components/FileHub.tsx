// app/providers.tsx
"use client";

import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/next-js";
import {
  Button,
  Card,
  Container,
  CardHeader,
  Heading,
  CardBody,
  Divider,
  useColorModeValue,
  Text,
  Flex,
  Stack,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  Image,
  Grid,
  GridItem,
  Center,
  AspectRatio,
  Box,
  SimpleGrid,
  Badge,
  Wrap,
  IconButton,
  WrapItem,
  InputGroup,
  InputLeftElement,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  Spacer,
  Tab,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { MusicCard } from "./MusicCard";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export function FileHub() {
  return (
    <Card bg={useColorModeValue("white", "brand.100")} h="100%">
      <CardBody maxH={"100vh"}>
        <Box bg="brand.100">
          <InputGroup
            pb="4"
            w="100%"
            bgGradient="linear(to-r, linear.100, linear.200)"
            bgClip={"text"}
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="linear.100" />
            </InputLeftElement>
            <Input placeholder="Search files" borderColor="linear.100" />
          </InputGroup>
          <Button
            leftIcon={<AddIcon />}
            w="100%"
            bgGradient="linear(to-r, linear.100, linear.200)"
          >
            Upload Files
          </Button>
          <Box pt="5">
            <Box
              as="button"
              w="100%"
              borderRadius="lg"
              h="55px"
              overflow="hidden"
              _hover={{ bg: "brand.200" }}
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
        </Box>
      </CardBody>
    </Card>
  );
}
