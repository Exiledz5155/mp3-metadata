"use client";

import { HStack, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSelectedSongs } from "../../contexts/SelectedSongsContext";
import { Album, CommonSongProperties } from "../../types/types";
import { calculateCommonProperties } from "../../util/commonprops";
import { calculateTotalDuration } from "../../util/duration";
import { renderImageFromAlbumLarge } from "../../util/generateimage";

export function AlbumInfoSection({ album }: { album: Album }) {
  const totalDuration = calculateTotalDuration(album.songs);
  const [imageDisplay, setImageDisplay] = useState<JSX.Element | null>(null);
  const [commonProperties, setCommonProperties] =
    useState<CommonSongProperties>(calculateCommonProperties(album.songs));
  const { selectedSongs, setSelectedSongs } = useSelectedSongs();

  useEffect(() => {
    setCommonProperties(calculateCommonProperties(album.songs));
  }, [album]);

  useEffect(() => {
    setImageDisplay(renderImageFromAlbumLarge(album, commonProperties));
  }, [album, commonProperties]);

  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setSelectedSongs([]);
    }
  };

  return (
    <HStack align={"start"} onClick={handleContainerClick}>
      {imageDisplay}
      <VStack align={"start"} w={"100%"}>
        <Text fontSize={"4xl"} as="b" noOfLines={1}>
          {commonProperties.albumTitle}
        </Text>
        <Text fontSize={"xl"} noOfLines={1}>
          {commonProperties.albumArtist}
        </Text>
        <Text fontSize={"md"} noOfLines={1}>
          {commonProperties.year} • {album.songs.length} songs, {totalDuration}
        </Text>
      </VStack>
    </HStack>
  );
}
