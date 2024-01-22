"use client";

import { Heading, extendTheme, type ThemeConfig } from "@chakra-ui/react";
import "@fontsource/roboto-mono";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === "dark" ? "black" : "white",
      },
    }),
  },
  colors: {
    brand: {
      100: "#121212",
      200: "#171717",
      300: "#222222",
    },
  },
  fonts: {
    mono: `'Roboto Mono', monospace`,
  },
});
