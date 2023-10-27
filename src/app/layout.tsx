// app/layout.tsx
"use client";

import { Navbar } from "../components/Navbar";
import { Providers } from "./providers";
import { useSelectionContainer } from "@air/react-drag-to-select";
import { Box, Flex, Spacer, Stack, HStack, VStack, useColorModeValue,ColorModeScript } from "@chakra-ui/react";
import theme from './theme';

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
    // console.log(typeof children);
    return;
  };

  const { DragSelection } = useSelectionContainer();
  return (
    <html lang="en">
      <body>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {/* For styling to work, components need to be placed under providers */}
        <Providers>
          <Navbar />
 
          {/* Refactor this to it's own component */}
          {/* <DragSelection /> */}
          <Flex h="125vh">
            {children}
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
