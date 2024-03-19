// app/providers.tsx
"use client";

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
  CardFooter,
  HStack,
  VStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { SongGridCard } from "./SongGridCard";
import { SongGridLabel } from "./SongGridLabel";
import { AlbumInfoSection } from "./AlbumInfoSection";
import React from "react";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export function SongDisplay() {
  const SongGridCards = [
    <SongGridCard songName="Backseat Freestyle" songLength="3:32" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="1"/>,
    <SongGridCard songName="The Art of Peer Pressure" songLength="5:24" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="2"/>,
    <SongGridCard songName="Money Trees (feat. Jay Rock)" songLength="6:26" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="3"/>,
    <SongGridCard songName="Poetic Justice (feat. Drake)" songLength="5:00" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="4"/>,
    <SongGridCard songName="Good Kid" songLength="3:34" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="5"/>,
    <SongGridCard songName="m.A.A.d city (feat. MC Eiht)" songLength="5:50" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="6"/>,
    <SongGridCard songName="Sing About Me, I'm Dying of Thirst" songLength="12:03" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="7"/>,
    <SongGridCard songName="Real (feat. Anna Wise)" songLength="7:23" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="8"/>,
    <SongGridCard songName="Compton (feat. Dr. Dre)" songLength="4:08" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="9"/>,
    <SongGridCard songName="The Recipe (feat. Dr. Dre)" songLength="5:53" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="10"/>,
    <SongGridCard songName="Black Boy Fly" songLength="4:39" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="11"/>,
    <SongGridCard songName="Now or Never (feat. Mary J. Blige)" songLength="4:17" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="12"/>,
    <SongGridCard songName="Collect Calls" songLength="3:58" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="13"/>,
    <SongGridCard songName="Swimming Pools (Drank)" songLength="4:08" songArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)" trackNumber="14"/>,
  ];

  return (
    <Card
      p={"20px"}
      bg={useColorModeValue("white", "brand.100")}
      h="100%"
      rounded={"xl"}
      maxH={"93.25vh"}
      overflow={"hidden"}
    >
      <AlbumInfoSection></AlbumInfoSection>
      <CardBody
        m={"0"}
        mt={"5"}
        px={"0"}
        pb={"0"}
        pt={"0"}
        display={"flex"}
        flexDirection={"column"}
        overflow={"auto"}
      >
        <SongGridLabel></SongGridLabel>
        <Divider position={"sticky"} top="6" />
        <Box>
          {/* TODO: Implement mapping function here */}
          {SongGridCards.map((card, index) =>
            React.cloneElement(card, {
              isLast: index === SongGridCards.length - 1,
            })
          )}
        </Box>
      </CardBody>
    </Card>
  );
}
