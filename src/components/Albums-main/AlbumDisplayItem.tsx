"use client";

import {
  AspectRatio,
  Box,
  Grid,
  GridItem,
  Text,
  WrapItem,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Album, CommonSongProperties } from "../../types/types";
import { calculateCommonProperties } from "../../util/commonprops";
import { renderImageAlbumItem } from "../../util/generateimage";

// Remove this and add to func header instead
interface AlbumDisplayItemProps {
  album: Album;
}

export function AlbumDisplayItem({ album }: AlbumDisplayItemProps) {
  const [commonProperties, setCommonProperties] =
    useState<CommonSongProperties>(calculateCommonProperties(album.songs));
  const [imageDisplay, setImageDisplay] = useState<JSX.Element | null>(null);

  useEffect(() => {
    setCommonProperties(calculateCommonProperties(album.songs));
  }, [album]);

  useEffect(() => {
    setImageDisplay(renderImageAlbumItem(album, commonProperties));
  }, [album, commonProperties]);

  return (
    <Link
      href={`/editor/${encodeURIComponent(commonProperties.albumTitle)}`}
      passHref
    >
      <WrapItem>
        <AspectRatio w="100%" maxWidth={"200px"} ratio={3 / 4} rounded="lg">
          <Box
            as="button"
            w="100%"
            h="100%"
            overflow="hidden"
            transition="box-shadow 0.3s ease, border 0.3s ease"
            _hover={{
              boxShadow: "0 0 8px 2px #8795D5, 0 0 12px 3px #CF97F4",
              // Remove or comment out the background changes to focus on the glow effect
              bg: "brand.300",
            }}
            bg={useColorModeValue("white", "brand.200")}
            display="flex"
            boxShadow="2xl" // no effect?
            rounded="lg"
            p={"1"}
          >
            <Grid
              templateRows="repeat(8, 1fr)"
              templateColumns="repeat(6, 1fr)"
              w="100%"
            >
              <GridItem rowSpan={6} colSpan={6}>
                {imageDisplay}
              </GridItem>
              <GridItem colSpan={6} rowSpan={1} pl={2} pr={2}>
                {commonProperties.albumTitle === "Untagged" ? (
                  <Text as="b" align="center" noOfLines={1}>
                    {commonProperties.albumTitle}
                  </Text>
                ) : (
                  <Text as="b" align="left" noOfLines={1}>
                    {commonProperties.albumTitle}
                  </Text>
                )}
              </GridItem>
              {/* TODO: NOT ENOUGH EMPTY SPACE BELOW JUICE WLRD TEXT */}
              {/* i.e, empty space between contents and border is not even all around */}
              <GridItem colSpan={6} rowSpan={1} pl={2} pr={2}>
                <Text align="left" noOfLines={1} fontSize={"xs"}>
                  {commonProperties?.albumArtist
                    ? commonProperties.albumArtist
                    : album.songs.length > 0 && album.songs[0].artist
                    ? album.songs[0].artist
                    : ""}
                </Text>
              </GridItem>
            </Grid>
          </Box>
        </AspectRatio>
      </WrapItem>
    </Link>
  );
}
