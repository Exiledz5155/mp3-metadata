"use client";

import { Providers } from "../providers";
import {
  Box,
  Button,
  Center,
  Fade,
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
import { FileHub } from "../../components/FileHub/FileHub";
import { useState } from "react";
import { DragHandleIcon } from "@chakra-ui/icons";

const LinkButton = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  // ensure that you're forwarding all of the required props for your case
  shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [size, setSize] = useState({ x: 350 });
  const [isDragging, setIsDragging] = useState(false);

  const handler = (mouseDownEvent) => {
    setIsDragging(true);

    const startSize = size;
    const startPosition = {
      x: mouseDownEvent.pageX,
    };

    function onMouseMove(mouseMoveEvent) {
      let newX = startSize.x - startPosition.x + mouseMoveEvent.pageX;
      let minX = 350;
      let maxX = 700;
      newX = Math.min(Math.max(newX, minX), maxX);
      setSize((currentSize) => ({
        x: newX,
      }));
    }
    function onMouseUp() {
      setIsDragging(false);
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp, { once: true });
  };
  return (
    <Providers>
      <Flex
        bg={useColorModeValue("white", "black")}
        h="100vh"
        maxH={"100%"}
        overflow={"hidden"}
        flexDirection={"column"}
      >
        <Box pl="4" pt="4" w="1fr" h="50px">
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
        </Box>
        <Flex pb="4" flex="1">
          <Box pl="4" pb="2" pr="1" w={size.x}>
            <FileHub />
          </Box>
          <Center>
            <Box
              id="draghandle"
              as="button"
              w="1"
              h="80%"
              onMouseDown={handler}
              borderRadius="lg"
              bg="gray"
              opacity={isDragging ? "1" : "0"}
              _hover={{
                opacity: "1",
              }}
              transition="opacity 0.5s ease"
            ></Box>
            {/* <DragHandleIcon
              cursor="col-resize"
              boxSize={6}
              onMouseDown={handler}
              _hover={{ color: "grey" }}
              borderRadius="md"
            ></DragHandleIcon> */}
          </Center>
          <Box pr="4" pb="2" pl="1" flex="1">
            {children}
          </Box>
        </Flex>
      </Flex>
      <SpeedInsights />
      <Analytics />
    </Providers>
  );
}
