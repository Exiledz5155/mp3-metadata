// app/providers.tsx
"use client";

import { Box, Center, HStack, Image, Text } from "@chakra-ui/react";

export function FileHubAlbum() {
  return (
    <Box pt="5">
      <Box
        as="button"
        w="100%"
        borderRadius="lg"
        h="55px"
        overflow="hidden"
        _hover={{ bg: "brand.200" }}
      >
        <HStack spacing="10px">
          <Center w="55px" h="55px">
            <Image
              src={
                "https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
              }
              alt={"An Image"}
              borderRadius="base"
              boxSize="45px"
            />
          </Center>
          <Text noOfLines={1} maxW={200} align="left">
            Goodbye & Good Riddance
          </Text>
        </HStack>
      </Box>
    </Box>
  );
}
