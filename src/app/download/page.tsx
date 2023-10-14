// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";

export default function Download({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <Providers>{children}</Providers>
    </CacheProvider>
  );
}
