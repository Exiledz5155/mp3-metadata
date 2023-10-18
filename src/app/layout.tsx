// app/layout.tsx
"use client";

import { Navbar } from "../components/Navbar";
import { Providers } from "./providers";
import { useSelectionContainer } from "@air/react-drag-to-select";
import { Box, Flex, Spacer, Stack, HStack, VStack } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileHub = ["Song1", "Song2", "Song2", "Song2"];

  const fileHubLink = (props: Props) => {
    const { children } = props;
    console.log(typeof children);
    return;
  };

  const { DragSelection } = useSelectionContainer();
  return (
    <html lang="en">
      <body>
        {/* For styling to work, components need to be placed under providers */}
        <Providers>
          <Navbar />

          {/* Refactor this to it's own component */}
          <DragSelection />
          <Flex h="125vh">
            <Box p="4" bg="#daffe4" h="100%" w="15%">
              FileHub
              {/* TODO: How to represent files */}
              <VStack spacing="2px">
                {fileHub.map((file) => (
                  <Box
                    p="4"
                    bg="green.300"
                    border="2px"
                    borderColor="gray.600"
                    key={file}
                    w="100%"
                  >
                    {file}
                  </Box>
                ))}
              </VStack>
            </Box>

            {children}
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
