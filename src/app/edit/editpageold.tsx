// app/providers.tsx
"use client";

import { CacheProvider } from "@chakra-ui/next-js";
import React, { useState, useEffect } from 'react';

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
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    album: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch('../api/update-metadata', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send formData directly, not inside an object
      });
  
      if (response.ok) {
        const data = await response.json();
      } else {
        console.error('Failed to send metadata.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
    };

    //filepaths
    const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('../api/filepaths');
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error('Request failed with status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);
  const filePaths = data
  console.log('edit page')
  console.log(filePaths)

  
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
              <form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />

              <FormLabel>Artist</FormLabel>
                <Input
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={handleChange}
                />

              <FormLabel>Album</FormLabel>
                <Input
                  type="text"
                  name="album"
                  value={formData.album}
                  onChange={handleChange}
                />
                {/*FIXME add rest of metadata form */}
                {/*form might be causing lag sometimes, need testing*/}

                {/* Add similar Input components for other fields */}
                <Button type="submit" colorScheme="gray">
                  Submit
                </Button>
              </FormControl>
            </form>
            {/*old form for reference on fields to add later*/}
              {/* <FormControl>
                <FormLabel>Song Title</FormLabel>
                <Input type="text" name="title" />

                <FormLabel>Album Title</FormLabel>
                <Input type="text" name="album"/>

                <FormLabel>Album Artist</FormLabel>
                <Input type="text" name="albumArtist" />

                <FormLabel>Artist(s)</FormLabel>
                <Input type="text" name="artist"/>

                <FormLabel>Year</FormLabel>
                <NumberBox defaultValue={2000} min={0} max={3000}/>

                <FormLabel>Genre</FormLabel>
                <Input type="text" name="genre"/>

                <FormLabel>Track #</FormLabel>
                <NumberBox defaultValue={0} min={0} max={3000} />
              </FormControl> */}
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