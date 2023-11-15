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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export function AlbumSongDisplay() {
  return (
    <Container maxW='container.xxl' pt="30px">
      {/* Editable Text in a Column View */}
      <Card>
        <CardHeader>
          <Heading size='lg' pl="20px">Your Albums</Heading>
          
        </CardHeader>
        <Box pl="40px"><Divider/></Box>
        <CardBody>
        
        
        </CardBody>
      </Card>
    </Container>
  );
}
