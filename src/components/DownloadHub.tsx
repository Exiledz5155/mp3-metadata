"use client";

import styled from "styled-components";
import {
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Box,
} from "@chakra-ui/react";
import { MusicCard } from "./MusicCard";
import { extendTheme } from "@chakra-ui/react";

// NON-CHAKRA UI STYLED TEXT (WORKS)
const StyledText = styled.h1`
  font-family: "Monsterrat", sans-serif;
  font-size: 30px;
`;

type DownloadHubProps = {
  selected_files: string[];
  fileProps: string[][];
  adder: (file: string) => void;
  remover: (file: string) => void;
};

// CHAKRA UI STYLED TEXT, DOESN'T WORK, WE WANT TO SWITCH TO THIS
const theme = extendTheme({
  textStyles: {
    h1: {
      // you can also use responsive styles
      fontSize: ["1000px", "1072px"],
      fontWeight: "bold",
      lineHeight: "110%",
      letterSpacing: "-2%",
    },
    h2: {
      fontSize: ["36px", "48px"],
      fontWeight: "semibold",
      lineHeight: "110%",
      letterSpacing: "-1%",
    },
  },
});

export default function DownloadHub({selected_files, fileProps, adder, remover}: DownloadHubProps) {
  // Creates mock song data
  console.log("Inside DownloadHub")
  console.log(fileProps);
  console.log(selected_files);
  return (
    <Box bg={useColorModeValue("green.400", "gray.900")}>
      <Box maxHeight="100%" overflowY="auto">
        <Table colorScheme="green" overflowY="auto">
          <Thead top={0}>
            <Tr>
              <Th>
                <StyledText>File List</StyledText>
              </Th>
            </Tr>
          </Thead>
          {/* colormode doesn't seem to respond correctly for Tbody */}
          <Tbody bg={useColorModeValue("green.400", "gray.900")}>
            {/* Maps the mock data and creates individual MusicCards */}
            {fileProps.map((file) => {
              return (
              // Make sure backend checks for metadata matching
              // Since if 2 songs share the same title, they share the same key
                <Tr key={file[2]} onClick={()=>{
                  console.log("You clicked on me!")
                  let file_index = selected_files.indexOf(file[2]);
                  if(file_index == -1){ // file isn't selected, so add it
                    adder(file[2]);
                    console.log("Added the file " + file[2])
                  }
                  else{
                    remover(file[2]);
                    console.log("Removed the file " + file[2])
                  }
                }}>
                    <MusicCard props={file}></MusicCard>  
                </Tr>
            )})}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
