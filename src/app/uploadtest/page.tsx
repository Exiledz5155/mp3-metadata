// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";
import { EditCardView } from "../../components/EditCardView";
import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import { EditForm } from "../../components/EditForm";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export default function Download({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <Box bg={useColorModeValue("green.400", "gray.900")}>
        <Box maxHeight="100%" overflowY="auto"></Box>
      </Box>
      {/* THIS IS AN EXTRA FLEX BOX, REFACTOR TO 1 LATER
      The second flex box can be found in EditCardView */}
      <Flex
        alignItems="flex-start"
        flexDirection="row"
        p={50}
        w="full"
        justifyContent="center"
        flexWrap="wrap"
      >
        <EditCardView></EditCardView>
        <EditForm></EditForm>
      </Flex>

      <Providers>{children}</Providers>
    </CacheProvider>
  );
}
