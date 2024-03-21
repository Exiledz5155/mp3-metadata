"use client";

import { TimeIcon } from "@chakra-ui/icons";
import { HStack, Flex, Divider, Text, Icon } from "@chakra-ui/react";

export function SongGridLabel() {
  return (
    <HStack
      align={"left"}
      borderRadius={"10px"}
      position={"sticky"}
      background="brand.100"
      top="0px"
      mt={5}
    >
      <Flex align={"left"} w="30%">
        <Text fontSize={"md"} mx={"4"}>
          #
        </Text>
        <Text textAlign={"left"} noOfLines={1}>
          Title
        </Text>
      </Flex>
      <Text textAlign={"left"} noOfLines={1} w="30%">
        Artist(s)
      </Text>
      <Text textAlign={"left"} noOfLines={1} w="30%">
        Album
      </Text>
      <Text textAlign={"center"} noOfLines={1} w="10%">
        <Icon as={TimeIcon} />
      </Text>
    </HStack>
  );
}
