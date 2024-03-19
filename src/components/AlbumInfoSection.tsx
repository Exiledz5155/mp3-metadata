"use client";

import { HStack, VStack, Text, Image } from "@chakra-ui/react";

export function AlbumInfoSection() {
  return (
    <HStack align={"start"}>
      <Image
        maxW={{ base: "100%", sm: "200px" }}
        src="https://m.media-amazon.com/images/I/71YMac+JmAL._UF1000,1000_QL80_.jpg"
        alt="Album Cover"
        mr={"20px"}
        borderRadius={"10px"}
      />
      <VStack align={"start"} w={"100%"}>
        <Text fontSize={"4xl"} as="b" noOfLines={1}>
        good kid, m.A.A.d city (Deluxe)
        </Text>
        <Text fontSize={"xl"} as="b" noOfLines={1}>
          Kendrick Lamar
        </Text>
        <Text fontSize={"md"} as="b" noOfLines={1}>
          2012 • 14 songs • 1 hour 17 minutes
        </Text>
      </VStack>
    </HStack>
  );
}
