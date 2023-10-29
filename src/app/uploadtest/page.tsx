// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";
import { CardView2 } from "../../components/EditPage";
import { Box, useColorModeValue } from "@chakra-ui/react";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export default function Download({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <Box bg={useColorModeValue("green.400", "gray.900")}>
        <Box maxHeight="100%" overflowY="auto">
          what up gang
        </Box>
      </Box>

      <CardView2></CardView2>

      <Providers>{children}</Providers>
    </CacheProvider>
  );
}
