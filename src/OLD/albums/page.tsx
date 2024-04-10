// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../../app/providers";
import { EditCardView } from "../../components/EditCardView";
import {
  Box,
  Container,
  Flex,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DownloadHub from "../components/DownloadHub";
import { AlbumDisplay } from "../../components/AlbumDisplay";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export default function EditPage({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("../api/filepaths");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const fileProps = data;
  // console.log("download page");
  // console.log(fileProps);

  const [selected, setSelected] = useState([]); // set of selected file
  // const addFile = (f)=> {
  //   setFiles((prevFiles) => [...prevFiles, f])
  // }

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
          fileProps={fileProps}
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
          <AlbumDisplay></AlbumDisplay>
        </Flex>
        {children}
      </Providers>
    </CacheProvider>
  );
}
