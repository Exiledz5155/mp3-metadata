// app/providers.tsx
"use client";

import {
  Card,
  CardBody,
  Divider,
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { SongGridCard } from "./SongGridCard";
import { SongGridLabel } from "./SongGridLabel";
import { AlbumInfoSection } from "./AlbumInfoSection";
import React from "react";

interface Song {
  trackNumber: number;
  id: string;
  title: string;
  duration: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  image: string;
}

interface AlbumObj {
  album: string;
  artist: string;
  albumArtURL: string;
  year: number;
  genre: string;
  songs: Song[];
}

export function SongDisplay({ album }: { album: AlbumObj }) {
  return (
    <Card
      p={"20px"}
      bg={useColorModeValue("white", "brand.100")}
      h="100%"
      rounded={"xl"}
      maxH={"93.25vh"}
      overflow={"hidden"}
    >
      {/* UPDATE THIS WITH PROPS */}
      <AlbumInfoSection album={album}></AlbumInfoSection>
      <SongGridLabel></SongGridLabel>
      <Divider position={"sticky"} top="6" mb={2} />
      <CardBody
        m={"0"}
        px={"0"}
        pb={"0"}
        pt={"0"}
        display={"flex"}
        flexDirection={"column"}
        overflow={"auto"}
        css={{
          "&::-webkit-scrollbar": {
            width: "5px",
          },
          "&::-webkit-scrollbar-track": {
            background: "transparent",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "10px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Box>
          {album.songs.map((song, index) => (
            <SongGridCard
              key={song.id} // Assuming each song has a unique ID
              song={song}
              // isLast={index === album.songs.length - 1}
            />
          ))}
        </Box>
      </CardBody>
    </Card>
  );
}
