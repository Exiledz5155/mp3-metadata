"use client";

import { TimeIcon } from "@chakra-ui/icons";
import { HStack, Flex, Divider, Text, Icon, Tooltip } from "@chakra-ui/react";

export function SongGridLabel() {
  return (
    <HStack
      align={"left"}
      borderRadius={"10px"}
      position={"sticky"}
      bg="brand.100"
      top="0px"
      mt={5}
    >
      <Flex align={"left"} w="30%">
        <Text fontSize={"md"} mx={"4"} color={"white"}>
          #
        </Text>
        <Text textAlign={"left"} noOfLines={1} color={"white"}>
          Title
        </Text>
      </Flex>
      <Text textAlign={"left"} noOfLines={1} w="30%" color={"white"}>
        Artist(s)
      </Text>
      <Text textAlign={"left"} noOfLines={1} w="30%" color={"white"}>
        Album
      </Text>
      <Text textAlign={"center"} noOfLines={1} w="10%">
        <Tooltip
          hasArrow
          label="Duration"
          aria-label="Duration"
          placement="top"
          bg={"brand.300"}
          color={"white"}
        >
          <Icon as={TimeIcon} color={"white"} />
        </Tooltip>
      </Text>
    </HStack>
  );
}
