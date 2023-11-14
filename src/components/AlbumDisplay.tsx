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
    <Container maxW='container.xxl'>
      {/* Editable Text in a Column View */}
      <Card>
        <CardHeader>
          <Heading size='lg' pl="20px">Your Albums</Heading>
          
        </CardHeader>
        <Box pl="40px"><Divider/></Box>
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
                _hover={{bg: "#F6F6F6", _dark:{bg: "#1A202C"}, w:"160px", h:"210px", m:"-5px"}}
                display='flex'
                boxShadow='2xl' rounded='md'
              >
                <Grid
                  templateRows='repeat(8, 1fr)'
                  templateColumns='repeat(6, 1fr)'
                >
                  <GridItem rowSpan={6} colSpan={6}>
                    <Center w="100%" h="100%" >
                      <Image src={"https://media.s-bol.com/3BBmVKWZ4GM/1200x1191.jpg"} alt={"An Image"} w="90%" rounded='md'/>                     
                    </Center>
                  </GridItem>
                  <GridItem colSpan={6} rowSpan={1}>
                    <Center w="100%" h="100%">
                      <Text as='b' align='left' noOfLines={1} w="90%">The Album 1 2 3 4 5 1 2 3 4</Text>            
                    </Center>
                  </GridItem>
                  <GridItem colSpan={6} rowSpan={1}>
                    <Center w="100%" h="100%">
                      <Text align='left' noOfLines={1} w="90%">Rick Astley</Text>         
                    </Center>
                  </GridItem>
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
