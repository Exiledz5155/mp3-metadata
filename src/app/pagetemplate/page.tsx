// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import { Providers } from "../providers";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Center,
  Grid,
  GridItem,
  Flex,
  Image,
  Button,
  VStack,
  Text,
  Divider,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useColorModeValue,
  useColorMode,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  ColorModeScript,
} from "@chakra-ui/react";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

function MusicCard() {
  const music = {
    imageUrl: "https://nektony.com/wp-content/uploads/2019/08/spotify-icon.png",
    imageAlt: "Music file Icon",
    title: "Song Title",
    artist: "Various Artists",
  };

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      h="60px"
      overflow="hidden"
    >
      <Grid
        h="100%"
        w="100%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={0}
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg={useColorModeValue("green.400", "gray.900")}
        >
          <Center w="60px" h="60px">
            <Image src={music.imageUrl} alt={music.imageAlt} boxSize="50px" />
          </Center>
        </GridItem>
        <GridItem colSpan={4}>{music.title}</GridItem>
        <GridItem colSpan={4}>{music.artist}</GridItem>
      </Grid>
    </Box>
  );
}

export default function Download({ children }: { children: React.ReactNode }) {
  const fileHub = [
    "Song1",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
  ];
  return (
    <CacheProvider>
      <Providers>
        {/* Place stuff above providers */}

        <Grid
          h="100%"
          w="100%"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem
            rowSpan={2}
            colSpan={1}
            bg={useColorModeValue("green.400", "gray.900")}
          >
            <Box maxHeight="100%" overflowY="auto">
              <Table colorScheme="green" overflowY="auto">
                <Thead top={0}>
                  <Tr>
                    <Th>File List</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {fileHub.map((file) => (
                    <Tr>
                      <MusicCard></MusicCard>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </Box>
          </GridItem>
          <GridItem colSpan={2} bg="papayawhip" />
          <GridItem colSpan={2} bg="papayawhip" />
          <GridItem colSpan={4} bg="tomato" />
        </Grid>
        {children}
      </Providers>
    </CacheProvider>
  );
}
