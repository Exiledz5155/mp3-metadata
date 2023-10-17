// app/providers.tsx
"use client";

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
import { UploadBox } from "../components/uploadbox";
import { CallToActionWithAnnotation } from "../components/CTA";

export default function Home({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <CallToActionWithAnnotation></CallToActionWithAnnotation>

      {/* Place stuff above providers */}
      <Providers>{children}</Providers>
    </CacheProvider>
  );
}

// Ideas to fill up whitespace
/* 

1. just make the splash page the upload page, scrap the splash idea

2. add reviews or FAQ (accordian) below upload box

3. video tutorial embedded YT vid showcasing webapp

Dark mode render flicker issue
https://www.npmjs.com/package/next-themes

*/
