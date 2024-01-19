"use client";

import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, useColorMode } from "@chakra-ui/react";

export function DarkModeButton() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button onClick={toggleColorMode} colorScheme='green'>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
