"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import styled from "styled-components";
import {
  Grid,
  GridItem,
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Box,
  Flex,
} from "@chakra-ui/react";
import { Providers } from "../app/providers";
import { MusicCard } from "./MusicCard";
import { extendTheme } from "@chakra-ui/react";

const StyledText = styled.h1`
  font-family: "Monsterrat", sans-serif;
  font-size: 30px;
`;

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

export default function DownloadHub() {
  // Creates mock song data
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
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 5",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 4",
      "Artist 4",
    ],
  ];

  return (
    <Box bg={useColorModeValue("green.400", "gray.900")}>
      <Box maxHeight="80%" overflowY="auto">
        <Table colorScheme="green" overflowY="auto">
          <Thead top={0}>
            <Tr>
              <Th>
                <StyledText>File List</StyledText>
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {/* Maps the mock data and creates individual MusicCards */}
            {fileProps.map((file) => (
              // Make sure backend checks for metadata matching
              // Since if 2 songs share the same title, they share the same key
              <Tr key={file[2]}>
                <MusicCard props={file}></MusicCard>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
