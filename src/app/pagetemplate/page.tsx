// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export default function Download({ children }: { children: React.ReactNode }) {
  const makeApiCall = async () => {
    await fetch("/api/hello", {
      method: "POST",
      body: JSON.stringify({ hello: "world" }),
    });
  };

  return (
    <CacheProvider>
      {/* Place stuff above providers */}
      <Providers>
        <button onClick={makeApiCall}>Click here to make a call</button>
        {children}
      </Providers>
    </CacheProvider>
  );
}
