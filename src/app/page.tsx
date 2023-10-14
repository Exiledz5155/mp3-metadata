// app/providers.tsx
"use client";

import { CallToActionWithAnnotation } from "@/src/components/CTA";
import { Providers } from "./providers";
import { CacheProvider } from "@chakra-ui/next-js";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

// FIX CSS NOT RENDERING, COMPONENTS SHOULD LOOK A LOT BETTER
export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <CallToActionWithAnnotation></CallToActionWithAnnotation>

      {/* Placing the component stuff above worked for me, try doing it below */}
      <Providers>{children}</Providers>
    </CacheProvider>
  );
}
