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
import { Album, Song } from "../../types/types";
import { useState } from "react";

export function SongDisplay({ album }: { album: Album }) {
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);

  const handleSelectSong = (
    songId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (event.shiftKey) {
      const allSongIds = album.songs.map((song) => song.id);
      const lastSelectedId = selectedSongs[selectedSongs.length - 1];
      const currentIdx = allSongIds.indexOf(songId);
      const lastIdx = allSongIds.indexOf(lastSelectedId);
      const start = Math.min(currentIdx, lastIdx);
      const end = Math.max(currentIdx, lastIdx);
      setSelectedSongs(allSongIds.slice(start, end + 1));
    } else if (event.ctrlKey || event.metaKey) {
      setSelectedSongs((prev) =>
        prev.includes(songId)
          ? prev.filter((id) => id !== songId)
          : [...prev, songId]
      );
    } else {
      setSelectedSongs([songId]);
    }
  };

  return (
    <Card
      p={"20px"}
      bg="brand.100"
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
              key={song.id}
              song={song}
              isSelected={selectedSongs.includes(song.id)}
              onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                handleSelectSong(song.id, event)
              }
              // isLast={index === album.songs.length - 1}
            />
          ))}
        </Box>
      </CardBody>
    </Card>
  );
}
