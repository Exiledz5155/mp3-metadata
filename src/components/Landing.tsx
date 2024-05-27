// components/Landing.js
"use client";

import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Heading,
  Input,
  Stack,
  Text,
  Image,
  Flex,
  HStack,
  Icon,
  IconButton,
  useDisclosure,
  Square,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdMusicNote } from "react-icons/md";

export function Landing() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="brand.50" color="white" minH="100vh">
        <Box bg="brand.50" px={600}>
          <Flex
            h={16}
            alignItems={"center"}
            justifyContent={"space-between"}
            px={10}
          >
            <Flex alignItems={"center"}>
              <Box
                bgGradient={"linear(to-r, linear.100, linear.200)"}
                borderRadius={5}
                p={1}
                h={10}
                w={10}
              >
                <Icon as={MdMusicNote} boxSize={8} color={"brand.100"} />
              </Box>
              <Text
                fontSize="xl"
                fontWeight="extrabold"
                ml={3}
                bgClip={"text"}
                bgGradient={"linear(to-r, linear.100, linear.200)"}
              >
                MP3 Metadata
              </Text>
            </Flex>
            <HStack
              spacing={8}
              alignItems={"center"}
              display={{ base: "none", md: "flex" }}
            >
              <Link href={"#"}>
                <Button
                  px={2}
                  py={1}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                >
                  Home
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  px={2}
                  py={1}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                >
                  Features
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  px={2}
                  py={1}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                >
                  Design
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  px={2}
                  py={1}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                >
                  Contact
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Box>

        <Box maxW="container.lg" mx="auto">
          <Box pt={20}>
            <Heading
              size="4xl"
              bgGradient={"linear(to-r, linear.100, linear.200)"}
              bgClip="text"
              p={5}
              textAlign={"center"}
              mb={5}
            >
              MP3 Tagging made easy
            </Heading>
            <Text
              textAlign="center"
              fontSize="2xl"
              mb={10}
              mx={"auto"}
              maxW={"70%"}
            >
              MP3 Metadata is a powerful yet simple tool for tagging MP3 Files.
              Upload your files, edit, save and download.
            </Text>
            <HStack justifyContent={"center"} spacing={5}>
              <Button
                w={"150px"}
                h={"50px"}
                bgGradient={"linear(to-r, linear.100, linear.200)"}
                _hover={{ color: "white", bg: "brand.300" }}
                color={"brand.200"}
              >
                Try the demo
              </Button>
              <Button
                w={"150px"}
                h={"50px"}
                bgGradient={"linear(to-r, linear.100, linear.200)"}
                _hover={{ color: "white", bg: "brand.300" }}
                color={"brand.200"}
              >
                Features
              </Button>
            </HStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}
