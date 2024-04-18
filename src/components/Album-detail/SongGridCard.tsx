"use client";

import React, { useState } from "react";
import { HStack, Flex, Image, Text, Box } from "@chakra-ui/react";
import ActionMenu from "../Actions/ActionMenu";
import { Album, Song } from "../../types/types";

interface SongGridCardProps {
  song: Song;
  isSelected: boolean;
  onClick: (songId: string, event: React.MouseEvent<HTMLDivElement>) => void;
  onRightClick: (
    songId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => void;
}

export function SongGridCard({
  song,
  isSelected,
  onClick,
  onRightClick,
}: SongGridCardProps) {
  return (
    <>
      {" "}
      <HStack
        id={song.id}
        borderRadius={"10px"}
        transition="background-color 0.2s ease"
        bg={isSelected ? "brand.400" : "transparent"}
        _hover={{ bg: isSelected ? "brand.400" : "brand.300" }}
        py={"2"}
        cursor={"pointer"}
        onClick={(event) => onClick(song.id, event)}
        onContextMenu={(event) => onRightClick(song.id, event)}
        sx={{
          userSelect: "none", // Disable text selection
        }}
      >
        {/* TODO: FIX MISALIGNMENT WHEN TRACK NUMBER IS DOUBLE DIGIT */}
        <Flex align={"center"} w="30%">
          {/* <Text fontSize={"md"} mx={"4"}>
            {song.trackNumber}
          </Text> */}
          <Box
            position="relative"
            height="40px"
            minWidth="24px"
            overflow="hidden"
            mr={4}
          >
            <Text
              position="absolute"
              right="0" // aligned to the right edge of the parent box
              top="50%"
              transform="translateY(-50%)" // centers the text vertically
              fontSize="md"
              whiteSpace="nowrap" // ensures the text stays on one line
              overflow="visible" // allows the text to be visible when it overflows
            >
              {song.trackNumber}
            </Text>
          </Box>

          {/* <Box width="30px" mx={"4"} border="1px solid red" textAlign="right">
            <Text fontSize={"md"} isTruncated>
              {song.trackNumber}
            </Text>
          </Box> */}
          <Image
            src={song.image}
            alt={song.title}
            w="50px"
            h="50px"
            borderRadius={"5px"}
            mr={"4"}
          />
          <Text textAlign={"left"} noOfLines={1}>
            {song.title}
          </Text>
        </Flex>
        <Text textAlign={"left"} noOfLines={1} w="30%">
          {song.artist}
        </Text>
        <Text textAlign={"left"} noOfLines={1} w="30%">
          {song.album}
        </Text>
        <Text textAlign={"center"} noOfLines={1} fontFamily={"mono"} w="10%">
          {song.duration}
        </Text>
      </HStack>
    </>
  );
}
