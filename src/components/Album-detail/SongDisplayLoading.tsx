// app/providers.tsx
"use client";

import {
  Card,
  CardBody,
  Divider,
  useColorModeValue,
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Image,
  Skeleton,
  SkeletonText,
  Icon,
  Square,
} from "@chakra-ui/react";
import { SongGridCard } from "./SongGridCard";
import { SongGridLabel } from "./SongGridLabel";
import { AlbumInfoSection } from "./AlbumInfoSection";
import { Album, Song } from "../../types/types";
import ActionMenu from "../Actions/ActionMenu";
import React from "react";
import { TimeIcon } from "@chakra-ui/icons";

export function SongDisplayLoading() {
  return (
    <Card
      p={"20px"}
      bg="brand.100"
      h="100%"
      rounded={"xl"}
      maxHeight="calc(100vh - 86px)"
      overflow={"hidden"}
    >
      <HStack align={"start"}>
        <Skeleton
          mr={"20px"}
          borderRadius={"10px"}
          startColor="brand.200"
          endColor="brand.400"
        >
          <Image
            maxW={{ base: "100%", sm: "200px" }}
            src={
              "https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
            }
            alt="Album Cover"
          />
        </Skeleton>
        <VStack align={"start"} w={"100%"}>
          <Skeleton
            fontSize={"4xl"}
            as="b"
            noOfLines={1}
            startColor="brand.200"
            endColor="brand.400"
          >
            Placeholder Album Title
          </Skeleton>
          <Skeleton
            fontSize={"xl"}
            as="b"
            noOfLines={1}
            startColor="brand.200"
            endColor="brand.400"
          >
            Placeholder artist
          </Skeleton>
          <Skeleton
            fontSize={"md"}
            as="b"
            noOfLines={1}
            startColor="brand.200"
            endColor="brand.400"
          >
            2024 • 22 songs • 1 hour, 22 mins
          </Skeleton>
        </VStack>
      </HStack>
      {/* SongGridLabel */}
      <Skeleton
        startColor="brand.200"
        endColor="brand.400"
        fadeDuration={1}
        mt={"5"}
      >
        <HStack
          align={"left"}
          borderRadius={"10px"}
          position={"sticky"}
          bg="brand.100"
          top="0px"
          mt={5}
        ></HStack>
      </Skeleton>
      <Skeleton startColor="brand.200" endColor="brand.400" fadeDuration={1}>
        <Divider position={"sticky"} top="6" mb={2} color={"white"} />
      </Skeleton>

      <CardBody
        m={"0"}
        p={"0"}
        display={"flex"}
        flexDirection={"column"}
        overflow={"hidden"}
        css={{
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
        <Box>
          <React.Fragment>
            {Array.from({ length: 20 }, (_, i) => (
              <HStack borderRadius={"10px"} py={"2"}>
                <Flex align={"center"} w="30%">
                  <Box
                    position="relative"
                    height="40px"
                    minWidth="24px"
                    overflow="hidden"
                    mr={4}
                  >
                    <Skeleton
                      startColor="brand.200"
                      endColor="brand.400"
                      position="absolute"
                      right="0" // aligned to the right edge of the parent box
                      top="50%"
                      transform="translateY(-50%)" // centers the text vertically
                      fontSize="md"
                      whiteSpace="nowrap" // ensures the text stays on one line
                      overflow="visible" // allows the text to be visible when it overflows
                    >
                      0
                    </Skeleton>
                  </Box>
                  <Skeleton
                    borderRadius={"5px"}
                    mr={"4"}
                    startColor="brand.200"
                    endColor="brand.400"
                    w="50px"
                    h="50px"
                  >
                    <Image
                      maxW={{ base: "100%", sm: "200px" }}
                      src={
                        "https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
                      }
                      alt="Album Cover"
                    />
                  </Skeleton>
                  <Skeleton
                    textAlign={"left"}
                    noOfLines={1}
                    startColor="brand.200"
                    endColor="brand.400"
                  >
                    Placeholder Song Title Placeholder Song Title Placeholder
                    Song Title Placeholder Song Title Placeholder Song Title
                    Placeholder Song Title
                  </Skeleton>
                </Flex>
                <Skeleton
                  textAlign={"left"}
                  noOfLines={1}
                  w="30%"
                  startColor="brand.200"
                  endColor="brand.400"
                >
                  Placeholder Artist
                </Skeleton>
                <Skeleton
                  textAlign={"left"}
                  noOfLines={1}
                  w="30%"
                  startColor="brand.200"
                  endColor="brand.400"
                >
                  Placeholder album
                </Skeleton>
                <Skeleton
                  textAlign={"center"}
                  noOfLines={1}
                  fontFamily={"mono"}
                  w="10%"
                  startColor="brand.200"
                  endColor="brand.400"
                >
                  1:23
                </Skeleton>
              </HStack>
            ))}
          </React.Fragment>
        </Box>
      </CardBody>
    </Card>
  );
}
