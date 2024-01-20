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

export function AlbumDisplay() {
  return (
    <Container maxW='container.xxl' >
      {/* Editable Text in a Column View */}
      <Card bg={useColorModeValue("white", "brand.100")}>
        <CardHeader>
          <Heading size='md'>Your Albums</Heading>
        </CardHeader>
        <Divider />
        <CardBody>
          <Wrap>
            <WrapItem>
              <AspectRatio w='150px' ratio={3 / 4}>
              <Box 
                as="button"
                borderWidth="1px"
                borderRadius="lg"
                w="100%"
                h="100%"
                overflow="hidden"
                _hover={{bg: "#F6F6F6", _dark:{bg: "#1A202C"}}}
                display='flex'
                boxShadow='2xl' rounded='md'
              >
                <Grid
                  templateRows='repeat(8, 1fr)'
                  templateColumns='repeat(6, 1fr)'
                >
                  <GridItem rowSpan={6} colSpan={6}>
                  <Image src={"https://media.s-bol.com/3BBmVKWZ4GM/1200x1191.jpg"} p={2} borderRadius='md' alt={"An Image"} w="100%"/>
                  </GridItem>
                  <GridItem colSpan={6} rowSpan={1} pl={2} pr={2}><Text as='b' align='left' noOfLines={1}>The Album 1 2 3 4 5 1 2 3 4</Text></GridItem>
                  <GridItem colSpan={6} rowSpan={1} pl={2} pr={2}><Text align='left' noOfLines={1}>Rick Astley</Text></GridItem>
                </Grid>
              </Box>
              </AspectRatio> 
            </WrapItem>
            
            
          </Wrap>
        </CardBody>
      </Card>
    </Container>
  );
}
