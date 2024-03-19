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
      200: "#191919",
      300: "#232323",
      400: "#313131",
    },
    linear: {
      100: "#8795D5",
      200: "#CF97F4",
    },
  },
  fonts: {
    mono: `'Roboto Mono', monospace`,
  },
});
