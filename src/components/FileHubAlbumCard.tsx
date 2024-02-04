"use client";

import { Box, HStack, Flex, Image, Text, VStack } from "@chakra-ui/react";

export function FileHubAlbumCard({ isLast = false }) {
  return (
    <Flex
      justifyContent={"space-between"}
      _hover={{ bg: "brand.300", _dark: { bg: "brand.200" } }}
      borderRadius={"none"}
      borderBottomRadius={isLast ? "lg" : "none"} // If last time in mapped list, add radius
    >
      <VStack
        alignItems={"left"}
        pl={"15px"}
        py={"5px"}
        maxWidth={"60%"}
        gap={"0px"}
      >
        <Text fontSize={"15px"} noOfLines={1} pt={"2px"}>
          Wasted (feat. Lil Uzi Vert)
        </Text>
        <Text fontSize={"10px"} noOfLines={1} pb={"3px"}>
          Juice WRLD, Lil Uzi Vert
        </Text>
      </VStack>
      <Flex alignItems={"center"} pr={"15px"} maxWidth={"40%"}>
        <Text fontFamily={"mono"} fontSize={"15px"}>
          1:14
        </Text>
      </Flex>
    </Flex>
  );
}
