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
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
    <SongGridCard />,
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
        px={0}
        pt={"8"}
        display={"flex"}
        flexDirection={"column"}
        overflow={"auto"}
      >
        <SongGridLabel></SongGridLabel>
        <Divider />
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
