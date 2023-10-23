// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";
import DownloadButton from "../../components/DownloadButton"

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export default function Download({ children }: { children: React.ReactNode }) {
  return (
    
    <CacheProvider>
      {/* Place stuff above providers */}
      <DownloadButton></DownloadButton>
      <Providers>{children}</Providers>
    </CacheProvider>
  );
}
