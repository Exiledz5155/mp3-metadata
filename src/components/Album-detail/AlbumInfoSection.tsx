"use client";

import {
  HStack,
  VStack,
  Text,
  Image,
  Center,
  Grid,
  GridItem,
  Icon,
} from "@chakra-ui/react";
import { Album, CommonSongProperties, Song } from "../../types/types";
import { calculateTotalDuration } from "../../util/duration";
import { calculateCommonProperties } from "../../util/commonprops";
import { MdOutlineQueueMusic } from "react-icons/md";
import { useState, useEffect } from "react";
import { renderImageFromAlbumLarge } from "../../util/generateimage";

export function AlbumInfoSection({ album }: { album: Album }) {
  const totalDuration = calculateTotalDuration(album.songs);
  const [imageDisplay, setImageDisplay] = useState<JSX.Element | null>(null);
  const [commonProperties, setCommonProperties] =
    useState<CommonSongProperties>(calculateCommonProperties(album.songs));

  useEffect(() => {
    setCommonProperties(calculateCommonProperties(album.songs));
  }, [album]);

  useEffect(() => {
    setImageDisplay(renderImageFromAlbumLarge(album, commonProperties));
  }, [album, commonProperties]);

  return (
    <HStack align={"start"}>
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
