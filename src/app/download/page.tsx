// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";
import DownloadButton from "../../components/DownloadButton";
import DownloadHub from "../../components/DownloadHub";
import { useState } from "react"; // will need to refactor to useContext in layout.tsx


const fileProps = [
  [
    "https://www.graphicdesignforum.com/uploads/default/original/2X/3/351b46d8082a31a5cbbf062a8425dcdbeddcabba.jpeg",
    "image_alt",
    "Song 1",
    "Artist 1",
  ],
  [
    "https://images.theconversation.com/files/512871/original/file-20230301-26-ryosag.jpg?ixlib=rb-1.1.0&rect=97%2C79%2C5799%2C5817&q=45&auto=format&w=926&fit=clip",
    "image_alt",
    "Song 2",
    "Artist 2",
  ],
  [
    "https://www.graphicdesignforum.com/uploads/default/original/2X/d/d3c4e744046205a49d06beb874df3b39da7c9c73.jpeg",
    "image_alt",
    "Song 3",
    "Artist 3",
  ]
];

export default function Download({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState(['/text.txt']);
 // const addFile = (f)=> {
 //   setFiles((prevFiles) => [...prevFiles, f])
 // }

 const selectFile = (file) => {
  setSelected((prevFiles) => [...prevFiles, file]);
 };
 const deselectFile = (file) => {
  setSelected((prevFiles) => prevFiles.filter((f) => f !== file));
 }

 console.log(typeof(setSelected))
  return (
    <CacheProvider>
      <Providers>
        <DownloadHub selected_files={selected}  fileProps={fileProps} adder={selectFile} remover={deselectFile}></DownloadHub>
        <DownloadButton selected_files={selected}></DownloadButton>
        {children}
      </Providers>
    </CacheProvider>
  );
}
