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
  keyframes,
} from "@chakra-ui/react";
import Link from "next/link";
import { MdMusicNote } from "react-icons/md";

// const glow = keyframes`
//   0% {
//     box-shadow: 0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4;
//   }
//   50% {
//     box-shadow: 0 0 10px 2px #8795D5, 0 0 13px 3px #CF97F4;
//   }
//   100% {
//     box-shadow: 0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4;
//   }
// `;

const glow = keyframes`
  0% {
    box-shadow: 0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4;
  }
  25% {
    box-shadow: 0 0 9px 2.5px #8795D5, 0 0 13px 3.5px #CF97F4;
  }
  50% {
    box-shadow: 0 0 10px 3px #8795D5, 0 0 14px 4px #CF97F4;
  }
  75% {
    box-shadow: 0 0 9px 2.5px #8795D5, 0 0 13px 3.5px #CF97F4;
  }
  100% {
    box-shadow: 0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4;
  }
`;

export function Landing() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="brand.50" color="white" minH="100vh">
        {/* NAV BAR */}
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
              <Link href={"/"}>
                <Text
                  fontSize="xl"
                  fontWeight="extrabold"
                  ml={3}
                  bgClip={"text"}
                  bgGradient={"linear(to-r, linear.100, linear.200)"}
                >
                  MP3 Metadata
                </Text>
              </Link>
            </Flex>
            <HStack
              spacing={4}
              alignItems={"center"}
              display={{ base: "none", md: "flex" }}
            >
              <Link href={"#"}>
                <Button
                  variant={"ghost"}
                  px={2}
                  py={1}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                  _hover={{
                    boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                    bg: "brand.100",
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  variant={"ghost"}
                  px={2}
                  py={1}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                  _hover={{
                    boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                    bg: "brand.100",
                  }}
                >
                  Features
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  variant={"ghost"}
                  px={2}
                  py={1}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                  _hover={{
                    boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                    bg: "brand.100",
                  }}
                >
                  Design
                </Button>
              </Link>
              <Link href={"#"}>
                <Button
                  variant={"ghost"}
                  px={2}
                  py={1}
                  rounded={"md"}
                  w={"80px"}
                  textAlign={"center"}
                  _hover={{
                    boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
                    bg: "brand.100",
                    transition: "all 0.3s ease-in-out",
                  }}
                >
                  Contact
                </Button>
              </Link>
            </HStack>
          </Flex>
        </Box>
        {/* INTRO */}
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
                _hover={{
                  color: "white",
                  bg: "brand.300",
                  transition: "all 0.3s ease-in-out",
                }}
                color={"brand.200"}
              >
                Try the demo
              </Button>
              <Button
                w={"150px"}
                h={"50px"}
                bgGradient={"linear(to-r, linear.100, linear.200)"}
                _hover={{
                  color: "white",
                  bg: "brand.300",
                  transition: "all 0.3s ease-in-out",
                }}
                color={"brand.200"}
              >
                Features
              </Button>
            </HStack>
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"center"} py={"70px"}>
          <Image
            maxH={"700px"}
            src="https://i.imgur.com/amcyT9X.png"
            alt="app img"
            borderRadius={15}
            boxShadow="0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4"
            // animation={`${glow} 4s infinite alternate cubic-bezier(0.68, -0.55, 0.27, 1.55)`}
            animation={`${glow} 4s infinite alternate ease-in-out`}
          ></Image>
        </Box>
      </Box>
    </>
  );
}
