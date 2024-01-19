"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, IconButton, useColorMode } from "@chakra-ui/react";

export function DarkModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      onClick={toggleColorMode}
      icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      aria-label={"toggle"}
      position='absolute' top={2} right={2}
    />
  );
}
