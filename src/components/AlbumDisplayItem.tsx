"use client";

import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Link,
  WrapItem,
  useColorModeValue,
  Text,
  Image,
} from "@chakra-ui/react";

export function AlbumDisplayItem() {
  return (
    <WrapItem>
      <AspectRatio w="150px" ratio={3 / 4}>
        <Box
          as="button"
          w="100%"
          h="100%"
          overflow="hidden"
          _hover={{ bg: "#F6F6F6", _dark: { bg: "brand.300", bgGradient: "linear(to-r, linear.100, linear.200)", bgClip: "border-box"} }}
          bg={useColorModeValue("white", "brand.200")}
          display="flex"
          boxShadow="2xl" // no effect?
          rounded="lg"
          p={"1"}
        >
          <Link href="./album-view" _hover={{ textDecoration: "none" }}>
            <Grid
              templateRows="repeat(8, 1fr)"
              templateColumns="repeat(6, 1fr)"
            >
              <GridItem rowSpan={6} colSpan={6}>
                <Image
                  src={
                    "https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
                  }
                  p={2}
                  borderRadius={"15"}
                  alt={"An Image"}
                  w="100%"
                />
              </GridItem>
              <GridItem colSpan={6} rowSpan={1} pl={2} pr={2}>
                <Text as="b" align="left" noOfLines={1}>
                  Goodbye & Good Riddance
                </Text>
              </GridItem>
              {/* TODO: NOT ENOUGH EMPTY SPACE BELOW JUICE WLRD TEXT */}
              {/* i.e, empty space between contents and border is not even all around */}
              <GridItem colSpan={6} rowSpan={1} pl={2} pr={2}>
                <Text align="left" noOfLines={1}>
                  Juice WRLD
                </Text>
              </GridItem>
            </Grid>
          </Link>
        </Box>
      </AspectRatio>
    </WrapItem>
  );
}
