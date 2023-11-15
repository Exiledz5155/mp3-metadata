"use client";

import { HStack, VStack, Text, Image } from "@chakra-ui/react";

export function AlbumInfoSection() {
  return (
    <HStack align={"start"}>
      <Image
        maxW={{ base: "100%", sm: "200px" }}
        src="https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
        alt="Album Cover"
        mr={"20px"}
        borderRadius={"10px"}
      />
      <VStack align={"start"} w={"100%"}>
        <Text fontSize={"4xl"} as="b" noOfLines={1}>
          Goodbye & Good Riddance
        </Text>
        <Text fontSize={"xl"} as="b" noOfLines={1}>
          Juice WRLD
        </Text>
        <Text fontSize={"md"} as="b" noOfLines={1}>
          2018 • 17 songs • 47 min 30 sec
        </Text>
      </VStack>
    </HStack>
  );
}
