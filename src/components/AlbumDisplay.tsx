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

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export function AlbumDisplay() {
  return (
    <Card bg={useColorModeValue("white", "brand.100")} h="100%" rounded={"xl"}>
      <CardHeader>
        <Heading size="lg">Your Albums</Heading>
      </CardHeader>
      <CardBody>
        <Wrap spacing={"5"}>
          {/* TODO: Make size of AlbumDisplayItem slightly responsive
          so that the padding on the right side of the screen is the same
          as the left side. */}
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
          <AlbumDisplayItem />
        </Wrap>
      </CardBody>
    </Card>
  );
}
