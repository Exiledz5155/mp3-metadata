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
import { Album, Song } from "../../types/types";

export function SongDisplay({ album }: { album: Album }) {
  return (
    <Card
      p={"20px"}
      bg={useColorModeValue("white", "brand.100")}
      h="100%"
      rounded={"xl"}
      maxHeight="calc(100vh - 86px)"
      overflow={"hidden"}
    >
      {/* UPDATE THIS WITH PROPS */}
      <AlbumInfoSection album={album}></AlbumInfoSection>
      <SongGridLabel></SongGridLabel>
      <Divider position={"sticky"} top="6" mb={2} />
      <CardBody
        m={"0"}
        p={"0"}
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
