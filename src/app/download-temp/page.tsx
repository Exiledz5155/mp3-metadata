// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";
import DownloadButton from "../../components/DownloadButton";
import DownloadHub from "../../components/DownloadHub";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
  AspectRatio,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableContainer,
  TableCaption,
  Tfoot,
} from "@chakra-ui/react";
import { MusicCardTemp } from "../../components/MusicCardTemp";
// Remember to change and reimport MusicCard

export default function Download({ children }: { children: React.ReactNode }) {
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
      "Song 6",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 7",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 8",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 9",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 10",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 11",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 12",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 13",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 14",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 15",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 16",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 17",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 18",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 19",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 20",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 21",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 22",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 23",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 24",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 25",
      "Artist 4",
    ],
    [
      "https://www.graphicdesignforum.com/uploads/default/original/2X/8/8f2f98d3793cc6aa38d7566340bd346156523ccd.jpeg",
      "image_alt",
      "Song 26",
      "Artist 4",
    ],
  ];
  return (
    <CacheProvider>
      <Providers>
        <>
          <Container maxW={"3xl"}>
            {/* Modify stack attributes to change spacing between elements */}
            <Stack
              as={Box}
              textAlign={"center"}
              spacing={{ base: 8, md: 14 }}
              py={{ base: 20, md: 36 }}
            >
              <Heading
                fontWeight={600}
                fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
                lineHeight={"110%"}
              >
                Download
                <br />
              </Heading>
              <Box maxHeight="100%" overflowY="auto">
                <Table colorScheme="green" overflowY="auto">
                  <Thead top={0}>
                    <Tr>
                      <Th></Th>
                    </Tr>
                  </Thead>
                  {/* colormode doesn't seem to respond correctly for Tbody */}
                  <Tbody bg={useColorModeValue("green.400", "gray.900")}>
                    {/* Maps the mock data and creates individual MusicCards */}
                    {fileProps.map((file) => (
                      // Make sure backend checks for metadata matching
                      // Since if 2 songs share the same title, they share the same key
                      <Tr key={file[2]}>
                        <MusicCardTemp props={file}></MusicCardTemp>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </Box>
            </Stack>
          </Container>
        </>
        {children}
      </Providers>
    </CacheProvider>
  );
}
