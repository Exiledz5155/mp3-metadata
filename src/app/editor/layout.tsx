"use client";

import { Providers } from "../providers";
import { Box, Center, Flex } from "@chakra-ui/react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { chakra } from "@chakra-ui/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { FileHub } from "../../components/FileHub/FileHub";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    let storedSize = localStorage.getItem("sideBarSize");
    setSize(storedSize ? JSON.parse(storedSize) : { x: 350 });
  }, []);

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
      localStorage.setItem("sideBarSize", JSON.stringify({ x: newX }));
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
        bg="black"
        h="100vh"
        p={3}
        maxH={"100%"}
        overflow={"hidden"}
        flexDirection={"column"}
      >
        <Box
          pl="5"
          w="1fr"
          h="50px"
          minH={"50px"}
          bg="brand.100"
          py={"3px"} // fix small height on 1080p
          my={0} // remove
          mx={0} // remove
          mb={3}
          rounded={"xl"}
          display={"flex"}
          alignItems={"center"}
        >
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
          <LinkButton
            href="/editor/albums"
            color="white"
            fontSize={{ base: "md", sm: "lg", md: "lg" }}
            bgClip="text"
            fontWeight="extrabold"
            bgGradient="linear(to-r, linear.100, linear.200)"
            pl={4}
          >
            Albums
          </LinkButton>
          <LinkButton
            href="/editor/uuid"
            color="white"
            fontSize={{ base: "md", sm: "lg", md: "lg" }}
            bgClip="text"
            fontWeight="extrabold"
            bgGradient="linear(to-r, linear.100, linear.200)"
            pl={4}
          >
            UUID
          </LinkButton>
        </Box>
        <Flex flex="1">
          <Box
            pl="0" // remove
            pr="1"
            w={size.x}
            maxHeight="calc(100vh - 71px)"
          >
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
          </Center>
          <Box
            pr="0" // remove
            pl="1"
            flex="1"
          >
            {children}
          </Box>
        </Flex>
      </Flex>
      <SpeedInsights />
      <Analytics />
    </Providers>
  );
}
