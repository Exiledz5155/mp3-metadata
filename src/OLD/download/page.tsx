// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../../app/providers";
import DownloadButton from "../components/DownloadButton";
import DownloadHub from "../components/DownloadHub";
import { useState, useEffect } from "react"; // will need to refactor to useContext in layout.tsx

export default function Download({ children }: { children: React.ReactNode }) {
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
  console.log("download page");
  console.log(fileProps);

  const [selected, setSelected] = useState([]); // set of selected file
  // const addFile = (f)=> {
  //   setFiles((prevFiles) => [...prevFiles, f])
  // }

  const selectFile = (file) => {
    setSelected((prevFiles) => [...prevFiles, file]);
  };
  const deselectFile = (file) => {
    setSelected((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  console.log(typeof setSelected);
  return (
    <CacheProvider>
      <Providers>
        <DownloadHub
          selected_files={selected}
          fileProps={fileProps}
          adder={selectFile}
          remover={deselectFile}
        ></DownloadHub>
        <DownloadButton selected_files={selected}></DownloadButton>
        {children}
      </Providers>
    </CacheProvider>
  );
}
