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
    <Container maxW="container.xxl">
      {/* Editable Text in a Column View */}
      <Card p={"20px"}>
        <AlbumInfoSection></AlbumInfoSection>
        <CardBody m={"0"} px={0} pt={"8"}>
          <Grid>
            <GridItem colSpan={1}>
              <Box overflow={"auto"} alignItems={"center"}>
                <SongGridLabel></SongGridLabel>
                <Divider />
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
    </Container>
  );
}
