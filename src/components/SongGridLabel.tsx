"use client";

import { HStack, Flex, Divider, Text } from "@chakra-ui/react";

export function SongGridLabel() {
  return (
    <HStack
      spacing={4}
      align={"center"}
      borderRadius={"10px"}
      justify={"space-between"}
    >
      <Flex align={"center"}>
        <Text fontSize={"md"} mx={"4"}>
          #
        </Text>
        <Text textAlign={"center"} noOfLines={1}>
          Title
        </Text>
      </Flex>
      <Text textAlign={"center"} noOfLines={1}>
        Artist(s)
      </Text>
      <Text textAlign={"center"} noOfLines={1}>
        Album
      </Text>
      <Text textAlign={"center"} mr={"4"} noOfLines={1}>
        Length
      </Text>
    </HStack>
  );
}
