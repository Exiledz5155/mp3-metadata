// app/providers.tsx
"use client";

import { Link } from "@chakra-ui/next-js";
import {
  Button,
  Card,
  Container,
  CardHeader,
  Heading,
  CardBody,
  Divider,
  useColorModeValue,
  Text,
  Flex,
  Stack,
  StackDivider,
  FormControl,
  FormLabel,
  Input,
  Image,
  Grid,
  GridItem,
  Center,
  AspectRatio,
  Box,
  SimpleGrid,
  Badge,
  Wrap,
  IconButton,
  WrapItem,
  Spacer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { AlbumDisplayItem } from "./AlbumDisplayItem";
const musicjson = require("../../public/files.json");

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

interface musicObj {
  id: string;
  title: string;
  artist: string;
  album: string;
  "album-artist": string;
  composer: string;
  genre: string;
  year: number;
  "track-num": number;
  "track-total": number;
  "disc-num": number;
  "disc-total": number;
  compilation: boolean;
  rating: number;
  bpm: number;
  artwork: string;
  "song-duration": number;
}

interface albumObj {
  album: string;
  artist: string;
  artwork: string;
}

let musiclist : musicObj[] = musicjson;
var albumlist: albumObj[] = [];

musiclist.forEach((item) => {
  var album: albumObj = {album: item.album, artist: item["album-artist"], artwork: item.artwork};
  if (!albumlist.includes(album)) {
    albumlist.push(album);
  }
});

export function AlbumDisplay() {
  return (
    <Card
      bg={useColorModeValue("white", "brand.100")}
      h="100%"
      rounded={"xl"}
      maxH={"93.25vh"}
      overflow={"hidden"}
    >
      <CardHeader>
        <Heading size="lg">Albums</Heading>
      </CardHeader>
      <CardBody overflowY={"auto"} pt={"0"}>
        <Divider mb={"20px"} p={"0"} />
        <SimpleGrid minChildWidth="150px" spacing="15px">
          {albumlist.map((album) => {
            return <AlbumDisplayItem id={""} title={"`"} artist={album.artist} album={album.album} album-artist={album.artist} composer={""} genre={""} year={0} track-num={0} track-total={0} disc-num={0} disc-total={0} compilation={false} rating={0} bpm={0} artwork={album.artwork} song-duration={0}/>;
          })}
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
