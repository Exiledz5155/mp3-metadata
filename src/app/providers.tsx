// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import UUIDProvider from "../contexts/UUIDContext";
import { theme } from "./theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <UUIDProvider>{children}</UUIDProvider>
    </ChakraProvider>
  );
}
