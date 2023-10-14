// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export default function Download({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <Providers>{children}</Providers>
    </CacheProvider>
  );
}
