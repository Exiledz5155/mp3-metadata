// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import UUIDProvider from "../contexts/UUIDContext";
import { theme } from "./theme";
import { FetchProvider } from "../contexts/FetchContext";
import { SelectedSongsProvider } from "../contexts/SelectedSongsContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <UUIDProvider>
        <FetchProvider>
          <SelectedSongsProvider>{children}</SelectedSongsProvider>
        </FetchProvider>
      </UUIDProvider>
    </ChakraProvider>
  );
}
