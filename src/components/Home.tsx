"use client";

import {
  Box,
  Center,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  HStack,
  Flex,
  VStack,
} from "@chakra-ui/react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { chakra } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Ellipse1Icon } from "./Elipse1Icon";
import { Ellipse2Icon } from "./Elipse2Icon";
import { Ellipse3Icon } from "./Elipse3Icon";
import { FaGithub } from "react-icons/fa";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const LinkButton = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  // ensure that you're forwarding all of the required props for your case
  shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
});

export function Home() {
  {
    /*Functions to deal with mouse position */
  }
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  //calculates the x and y position of the users cursor
  const handleMouseMove = (event) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  {
    /*Functions to deal with calculating colo based on mouse position */
  }
  const calculateColor = () => {
    // Check if window object is defined (i.e., we are on the client-side)
    if (typeof window !== "undefined") {
      //both of these colors represent spectrums of the window where the cursor color will be a mix of these two
      //if different colors of cursor blur is wanted this would be what to change
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

  //ended up not using in final design but could be useful later on while redesigning
  // const calculateBlurRadius = () => {
  //   if (typeof window !== "undefined") {
  //     const distanceFromCenter = Math.sqrt(
  //       Math.pow(mousePosition.x - window.innerWidth / 2, 2) +
  //         Math.pow(mousePosition.y - window.innerHeight / 2, 2)
  //     );
  //     const maxBlurRadius = 100; // Maximum blur radius
  //     const blurStartRadius = 0; // Radius from the center where blur starts to appear
  //     const blurEndRadius = Math.min(
  //       window.innerWidth / 2,
  //       window.innerHeight / 2
  //     ); // Radius from the center where blur effect ends
  //     let blurRadius = 0;

  //     if (distanceFromCenter >= blurStartRadius) {
  //       // Calculate blur radius based on distance from the center
  //       blurRadius =
  //         ((distanceFromCenter - blurStartRadius) /
  //           (blurEndRadius - blurStartRadius)) *
  //         maxBlurRadius;
  //     }

  //     return blurRadius;
  //   }
  // };

  {
    /*Constant size of the blurs can change based on what we want*/
  }
  const blurRadius = 50; //adjust how blury the cursor blur is
  const gradientSize = 250; // Adjust the size of the gradient circle of the cursor as needed

  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        py={{ base: 20, md: 60 }}
        bg={useColorModeValue("white", "black")}
        h="100vh"
        onMouseMove={handleMouseMove}
        position="relative"
      >
        {/* Background Mouse Blur - Uses Functions written above - If one wants to change size or blurryness change(blurRadius and gradientSize*/}
        <Box
          position="absolute"
          top={`${mousePosition.y - gradientSize / 2}px`}
          left={`${mousePosition.x - gradientSize / 2}px`}
          pointerEvents="none"
          width={`${gradientSize}px`}
          height={`${gradientSize}px`}
          borderRadius="50%"
          background={`radial-gradient(circle, ${calculateColor()} 0%, rgba(0,0,0,0) 100%)`}
          style={{ filter: `blur(${blurRadius}px)` }}
        />
        {/*Column flex  includes icon, title,  description and both button */}
        <VStack
          padding={8}
          flex="1" // Take up all available space vertically
          direction="column"
          justify="center"
          alignItems="flex-start"
        >
          {/*Github Icon */}
          <Box
            position="absolute"
            top="20px"
            left="20px" // Adjust left position as needed
            zIndex="10" // Ensure the icon appears above other content
          >
            <LinkButton
              href="https://github.com/Exiledz5155/mp3-metadata"
              target="_blank" // Open link in a new tab
              rel="noopener noreferrer"
            >
              <Center>
                <FaGithub size={24} /> {/* Adjust size of the icon as needed */}
              </Center>
            </LinkButton>
          </Box>

          <Heading
            fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
            marginLeft={"20"}
          >
            MP3 Metadata
          </Heading>
          <Text marginLeft={"20"}>A web-based MP3 metadata editor.</Text>
          <HStack gap={0}>
            <LinkButton
              href="/editor/albums"
              p={2}
              color="white"
              fontSize={{ base: "md", sm: "lg", md: "lg" }}
              borderRadius="full"
              bgGradient="linear(to-r, #8795D5, #CF97F4)"
              _hover={{
                bgGradient: "linear(to-r, purple.300, cyan.300)",
              }}
              h=""
              w="60"
              marginLeft={"20"}
              rounded={"md"}
              //icons arent working presubambly because of linked button if we want to add, will have to do something else
              // leftIcon={<ArrowLeftIcon />}
              // rightIcon={<ArrowRightIcon />}
            >
              <Center>Start Editing</Center>
            </LinkButton>
            <LinkButton
              href="/editor/albums"
              p={2}
              color="white"
              fontSize={{ base: "md", sm: "lg", md: "lg" }}
              borderRadius="full"
              bgGradient="linear(to-r, #8795D5, #CF97F4)"
              _hover={{
                bgGradient: "linear(to-r, purple.300, cyan.300)",
              }}
              h=""
              w="60"
              marginLeft={"10"}
              rounded={"md"}
              //icons arent working presubambly because of linked button if we want to add, will have to do something else
              // leftIcon={<ArrowLeftIcon />}
              // rightIcon={<ArrowRightIcon />}
            >
              <Center>See a Demo</Center>
            </LinkButton>
          </HStack>
        </VStack>

        {/* Box containing all the elipses? */}
        <Flex
          flexGrow="1" // Take up all available space vertically
          direction="column"
          justify="center"
          pl={{ base: 0, md: 4 }}
        >
          {/*All of these elipses use percentages to scale with viewport. This is where one could adjust size and amount of blue of the elipses */}
          <Box
            position="relative"
            flexGrow="1"
          >
            {/* Ellipse 1 */}
            <Box
              position="absolute"
              bottom={0}
              right="50%"
              width="40%"
              height="45%"
              overflow="visible"
              css={{ filter: "blur(50px)" }}
            >
              <Ellipse1Icon />
            </Box>

            {/* Ellipse 2 */}
            <Box
              position="absolute"
              bottom={0}
              right="40%"
              width="40%"
              height="75%"
              overflow="visible"
              css={{ filter: "blur(50px)" }}
            >
              <Ellipse2Icon />
            </Box>

            {/* Ellipse 3 */}
            <Box
              position="absolute"
              bottom={0}
              right="31.7%"
              width="40%"
              height="45%"
              overflow="visible"
              css={{ filter: "blur(50px)" }}
            >
              <Ellipse3Icon />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}
