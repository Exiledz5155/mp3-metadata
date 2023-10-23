// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";

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
} from "@chakra-ui/react";
import { NumberBox } from "../../components/NumberBox";
import { Providers } from "../providers";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export default function Download({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      {/* Place stuff above providers */}
      <Grid templateColumns="repeat(3, 1fr)" gap={6} w="100%">
        <GridItem w="100%">
          <Center>
            <Flex
              align="center"
              justify="center"
              mt="50px"
              maxW="sm"
              bg="green.400"
              w="100%"
              p={2}
              color="white"
              borderRadius={10}
            >
              <VStack spacing={40} align="stretch">
                <Center>
                  <Flex p="10px" maxW="300px">
                    <Image src="https://m.media-amazon.com/images/I/71NUQhdZDJL._UF1000,1000_QL80_.jpg" />
                  </Flex>
                </Center>
                <Button colorScheme="gray">Upload</Button>
              </VStack>
            </Flex>
          </Center>
        </GridItem>

        <GridItem w="100%">
          <Center>
            <Flex
              align="center"
              justify="center"
              mt="50px"
              maxW="sm"
              bg="green.400"
              w="100%"
              p={2}
              color="white"
              borderRadius={10}
            >
              <FormControl>
                <FormLabel>Song Title</FormLabel>
                <Input type="text" />

                <FormLabel>Album Title</FormLabel>
                <Input type="text" />

                <FormLabel>Album Artist</FormLabel>
                <Input type="text" />

                <FormLabel>Artist(s)</FormLabel>
                <Input type="text" />

                <FormLabel>Year</FormLabel>
                <NumberBox defaultValue={2000} min={0} max={3000} />

                <FormLabel>Genre</FormLabel>
                <Input type="text" />

                <FormLabel>Track #</FormLabel>
                <NumberBox defaultValue={0} min={0} max={3000} />
              </FormControl>
            </Flex>
          </Center>
        </GridItem>

        <GridItem w="100%">
          <Center>
            <Flex
              mt="50px"
              maxW="sm"
              bg="green.400"
              w="100%"
              p={2}
              color="white"
              borderRadius={10}
            >
              <VStack spacing={5} align="stretch">
                <Text>Bitrate: 128 Kb/s</Text>
                <Text>Length: 4 minutes and 31 seconds</Text>
                <Text>Date Created: March 15, 2015</Text>
                <Text>Date Modified: Today</Text>
              </VStack>
            </Flex>
          </Center>
        </GridItem>
      </Grid>

      <Providers>{children}</Providers>
    </CacheProvider>
  );
}
