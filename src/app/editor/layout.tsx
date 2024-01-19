"use client";

import { Providers } from "../providers";
import { Box } from "@chakra-ui/react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { chakra } from "@chakra-ui/react";

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
      <Box  p="4">
        <LinkButton
          href="/"
          color="white"
          fontSize={{ base: "md", sm: "lg", md: "lg" }}
          bgClip="text"
          fontWeight='extrabold'
          bgGradient="linear(to-r, purple.600, cyan.600)"
        >
          MP3 Metadata
        </LinkButton>
      </Box>
      {children}
    </Providers>
  );
}
