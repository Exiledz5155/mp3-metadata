// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../../providers";
import { EditCardView } from "../../../components/EditCardView";
import {
  Box,
  Container,
  Flex,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditForm } from "../../../components/EditForm";
import { useState, useEffect } from "react";
import DownloadHub from "../../../components/DownloadHub";
import { AlbumDisplay } from "../../../components/AlbumDisplay";
import { SongDisplay } from "../../../components/SongDisplay";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export default function AlbumView() {
  return (
    <Providers>
      <Flex
        alignItems="center"
        flexDirection="column"
        w="full"
        justifyContent="right"
        mt={55}
      >
        <SongDisplay></SongDisplay>
      </Flex>
    </Providers>
  );
}
