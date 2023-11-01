// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";
import { EditCardView } from "../../components/EditCardView";
import { Box, Container, Flex, useColorModeValue } from "@chakra-ui/react";
import { EditForm } from "../../components/EditForm";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export default function Download({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      {/* Placeholder for filehub */}
      <Box bg={useColorModeValue("green.400", "gray.900")}>
        <Box maxHeight="100%" overflowY="auto">
          Filehub placeholder for now Filler filler
        </Box>
      </Box>

      <Flex
        alignItems="center"
        flexDirection="column"
        w="full"
        justifyContent="center"
      >
        <EditCardView></EditCardView>
        <EditForm></EditForm>
      </Flex>

      <Providers>{children}</Providers>
    </CacheProvider>
  );
}
