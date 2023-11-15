"use client";

import { HStack, Flex, Image, Text } from "@chakra-ui/react";

export function SongGridCard() {
  return (
    <HStack
      spacing={4}
      align={"center"}
      borderRadius={"10px"}
      justify={"space-between"}
      _hover={{ bg: "#F6F6F6", _dark: { bg: "#1A202C" } }}
      my={"4"}
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
      <Text textAlign={"center"} mr={"4"} noOfLines={1}>
        1:14
      </Text>
    </HStack>
  );
}
