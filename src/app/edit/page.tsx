// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";
import { EditCardView } from "../../components/EditCardView";
import {
  Box,
  Container,
  Flex,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { EditForm } from "../../components/EditForm";
import { useState, useEffect } from "react";
import DownloadHub from "../../components/DownloadHub";
import filePaths from "../fileStorage";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny
export default function EditPage({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState([]); // set of selected file
  const selectFile = (file) => {
    setSelected([file]);
  };
  const deselectFile = (file) => {
    setSelected((prevFiles) => [...prevFiles]);
  };
  return (
    <CacheProvider>
      <Providers>
        <DownloadHub
          selected_files={selected}
          fileProps={filePaths} // removed the useEffect logic and passes this in directly
          adder={selectFile}
          remover={deselectFile}
        ></DownloadHub>

        <Flex
          alignItems="center"
          flexDirection="column"
          w="full"
          justifyContent="right"
          mt={55}
        >
          <EditCardView selectFile={selected}></EditCardView>
          <EditForm selectFile={selected}></EditForm>
        </Flex>
        {children}
      </Providers>
    </CacheProvider>
  );
}
