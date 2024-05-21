"use client";
import React, { useState } from "react";
import { Flex, Text, VStack } from "@chakra-ui/react";
import { Album, Song } from "../../types/types";
import { convertTime } from "../../util/duration";
import { useSelectedSongs } from "../../contexts/SelectedSongsContext";

export function FileHubAlbumCard({
  song,
  isLast = false,
  onRightClick,
}: {
  song: Song;
  isLast?: boolean;
  onRightClick: (
    songId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
}) {
  const { selectedSongs, setSelectedSongs } = useSelectedSongs();
  const isSelected = selectedSongs.includes(song.id);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.ctrlKey || event.metaKey) {
      setSelectedSongs((prev) =>
        prev.includes(song.id)
          ? prev.filter((id) => id !== song.id)
          : [...prev, song.id]
      );
    } else {
      setSelectedSongs([song.id]);
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Flex
      justifyContent={"space-between"}
      transition="background-color 0.2s ease"
      _hover={
        isSelected ? undefined : { bg: "brand.400", _dark: { bg: "brand.300" } }
      }
      onClick={handleClick}
      onContextMenu={(event) => onRightClick(song.id, event)}
      borderRadius={"none"}
      borderBottomRadius={isLast ? "lg" : "none"}
      bg={isSelected ? "brand.400" : isHovered ? "brand.400" : "transparent"}
      _dark={{
        bg: isSelected ? "brand.400" : isHovered ? "brand.300" : "transparent",
      }}
      onMouseOver={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <VStack alignItems={"left"} pl={"15px"} py={"5px"} gap={"0px"}>
        <Text fontSize={"15px"} noOfLines={1} pt={"2px"} userSelect="none">
          {song.title}
        </Text>
        <Text fontSize={"10px"} noOfLines={1} pb={"3px"} userSelect="none">
          {song.artist}
        </Text>
      </VStack>
      <Flex alignItems={"center"} pr={"15px"} maxWidth={"40%"}>
        <Text fontFamily={"mono"} fontSize={"15px"} userSelect="none">
          {convertTime(song.duration)}
        </Text>
      </Flex>
    </Flex>
  );
}
