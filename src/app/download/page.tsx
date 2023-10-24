// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";
import DownloadButton from "../../components/DownloadButton";
import DownloadHub from "../../components/DownloadHub";

export default function Download({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      {/* Place stuff INSIDE providers */}
      <Providers>
        <DownloadHub children={""}></DownloadHub>
        <DownloadButton></DownloadButton>
        {children}
      </Providers>
    </CacheProvider>
  );
}
