"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../../providers";
import { AlbumDisplay } from "../../../components/AlbumDisplay";
import { Container, Card, useColorModeValue, CardHeader, Heading, Divider, CardBody, Wrap, WrapItem, AspectRatio, Grid, GridItem, Box, Text, Image } from "@chakra-ui/react";

export default function EditPage({ children }: { children: React.ReactNode }) {
  return (
    <AlbumDisplay/>
  );
}
