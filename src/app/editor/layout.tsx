"use client";

import { Providers } from "../providers";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { chakra } from "@chakra-ui/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { FileHub } from "../../components/FileHub";

const LinkButton = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  // ensure that you're forwarding all of the required props for your case
  shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <Box
        bg={useColorModeValue("white", "black")}
        h="100vh"
        maxH={"100%"}
        overflow={"hidden"}
      >
        <Grid
          templateAreas={`"header header"
                  "nav main"`}
          gridTemplateRows={"50px 1fr"}
          gridTemplateColumns={"350px 1fr"}
          h="100vh"
          maxH={"100%"}
          gap="1"
          color="blackAlpha.700"
        >
          <GridItem pl="4" pt="4" area={"header"}>
            <LinkButton
              href="/"
              color="white"
              fontSize={{ base: "md", sm: "lg", md: "lg" }}
              bgClip="text"
              fontWeight="extrabold"
              bgGradient="linear(to-r, linear.100, linear.200)"
            >
              MP3 Metadata
            </LinkButton>
          </GridItem>
          <GridItem pl="4" pb="2" pr="1" area={"nav"}>
            <FileHub />
          </GridItem>
          <GridItem pl="1" pr="4" pb="2" area={"main"}>
            {children}
          </GridItem>
        </Grid>
      </Box>
      <SpeedInsights />
      <Analytics />
    </Providers>
  );
}
