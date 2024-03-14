"use client";

import {
  Box,
  Center,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { chakra } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Ellipse1Icon } from "./Elipse1Icon";
import { Ellipse2Icon } from "./Elipse2Icon";
import { Ellipse3Icon } from "./Elipse3Icon";
// import { FaGithub } from 'react-icons/fa';
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const LinkButton = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  // ensure that you're forwarding all of the required props for your case
  shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
});

export function Home() {
  {/*Functions to deal with mouse position */}
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  {/*Functions to deal with calculating colo based on mouse position */}
  const calculateColor = () => {
    // Check if window object is defined (i.e., we are on the client-side)
    if (typeof window !== "undefined") {
      const color1 = [0, 255, 255]; // RGBA values for the first color
      const color2 = [151, 71, 255]; // RGBA values for the second color

      const xRatio = mousePosition.x / window.innerWidth; // Calculate x-axis ratio based on mouse position
      const yRatio = mousePosition.y / window.innerHeight; // Calculate y-axis ratio based on mouse position

      const interpolatedColor = color1.map((channel, index) => {
        return Math.round(
          channel +
            xRatio * (color2[index] - channel) +
            yRatio * (color2[index] - channel)
        ); // Interpolate each channel
      });

      return `rgba(${interpolatedColor.join()}, 0.5)`; // Construct RGBA color string
    }
  };


  const calculateBlurRadius = () => {
    if (typeof window !== "undefined") {
      const distanceFromCenter = Math.sqrt(
        Math.pow(mousePosition.x - window.innerWidth / 2, 2) +
          Math.pow(mousePosition.y - window.innerHeight / 2, 2)
      );
      const maxBlurRadius = 100; // Maximum blur radius
      const blurStartRadius = 0; // Radius from the center where blur starts to appear
      const blurEndRadius = Math.min(
        window.innerWidth / 2,
        window.innerHeight / 2
      ); // Radius from the center where blur effect ends
      let blurRadius = 0;
  
      if (distanceFromCenter >= blurStartRadius) {
        // Calculate blur radius based on distance from the center
        blurRadius =
          ((distanceFromCenter - blurStartRadius) /
            (blurEndRadius - blurStartRadius)) *
          maxBlurRadius;
      }
  
      return blurRadius;
    }
  };
  
  {/*Constant size of the blurs can change based on what we want*/}
  const gradientSize = 250; // Adjust the size of the gradient circle as needed

  return (
    <>
      <Stack
        as={Box}
        textAlign={"left"}
        spacing={{ base: 4, md: 10 }}
        py={{ base: 20, md: 60 }}
        bg={useColorModeValue("white", "black")}
        h="100vh"
        onMouseMove={handleMouseMove}
        position="relative"
      >
        {/* Background */}
        <Box
          position="absolute"
          top={`${mousePosition.y - gradientSize / 2}px`}
          left={`${mousePosition.x - gradientSize / 2}px`}
          pointerEvents="none"
          width={`${gradientSize}px`}
          height={`${gradientSize}px`}
          borderRadius="50%"
          background={`radial-gradient(circle, ${calculateColor()} 0%, rgba(0,0,0,0) 100%)`}
          style={{ filter: `blur(${calculateBlurRadius()}px)` }}
        />

        {/*Github Icon  - need to fix this*/}
        {/* <LinkButton
          href="https://github.com/Exiledz5155/mp3-metadata"

        >
          <Center><FaGithub/></Center>
        </LinkButton> */}

        {/* Ellipse 1 */}
        <Box
          position="absolute"
          bottom="50px" // Adjusted bottom position to leave space from the bottom of the viewport
          right="300px" // Adjusted right position to leave space from the right side of the viewport
          width={"335px"}
          height={"326px"}
          overflow={"visible"}
          css={{ filter: "blur(125px)" }}
        >
          <Ellipse1Icon />
        </Box>

        {/* Ellipse 2 */}
        <Box
          css={{
            position: "absolute",
            bottom: "300px", // Adjusted bottom position to leave space from the bottom of the viewport
            right: "125px", // Adjusted right position to leave space from the right side of the viewport
            width: "335px",
            height: "326px",
            overflow: "visible",
            filter: "blur(125px)",
          }}
        >
          <Ellipse2Icon />
        </Box>

        {/* Ellipse 3 */}
        <Box
          css={{
            position: "absolute",
            bottom: "50px", // Adjusted bottom position to leave space from the bottom of the viewport
            right: "25px", // Adjusted right position to leave space from the right side of the viewport
            width: "335px",
            height: "326px",
            overflow: "visible",
            filter: "blur(125px)",
          }}
        >
          here
          <Ellipse3Icon />
        </Box>

        <Heading
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
          marginLeft={"20"}
        >
          MP3 Metadata Editor
        </Heading>
        <LinkButton
          href="/editor/albums"
          p={2}
          color="white"
          fontSize={{ base: "md", sm: "lg", md: "lg" }}
          borderRadius="full"
          bgGradient="linear(to-r, purple.600, cyan.600)"
          _hover={{
            bgGradient: "linear(to-r, purple.300, cyan.300)",
          }}
          h=""
          w="80"
          marginLeft={"20"}
          //icons arent working presubambly because of linked button if we want to add, will have to do something else
          // leftIcon={<ArrowLeftIcon />}
          // rightIcon={<ArrowRightIcon />}
        >
          <Center>Start Editing</Center>
        </LinkButton>
      </Stack>
    </>
  );
}
