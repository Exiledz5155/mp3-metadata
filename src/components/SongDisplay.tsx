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

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export function SongDisplay() {
  return (
    <Card
      p={"20px"}
      h={"100%"}
      overflow={"hidden"}
      pb={0}
      bg={useColorModeValue("white", "brand.100")}
      w="100%"
      rounded={"xl"}
    >
      <AlbumInfoSection></AlbumInfoSection>
      <CardBody m={"0"} px={0} pt={"8"}>
        <Grid>
          <SongGridLabel></SongGridLabel>
          <Divider />
          <GridItem colSpan={1}>
            <Box maxH={"72vh"} overflowY="auto">
              {/* TODO: Implement mapping function here */}
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
              <SongGridCard></SongGridCard>
            </Box>
          </GridItem>
        </Grid>
      </CardBody>
    </Card>
  );
}
