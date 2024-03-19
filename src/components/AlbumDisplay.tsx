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
    <Card
      bg={useColorModeValue("white", "brand.100")}
      h="100%"
      rounded={"xl"}
      maxH={"93.25vh"}
      overflow={"hidden"}
    >
      <CardHeader>
        <Heading size="lg">Albums</Heading>
      </CardHeader>
      <CardBody overflowY={"auto"} pt={"0"}>
        <Divider mb={"20px"} p={"0"} />
        <SimpleGrid minChildWidth="150px" spacing="15px">
          <AlbumDisplayItem albumCover="https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG" albumArtist="Gorillaz" albumName="Demon Days"/>
          <AlbumDisplayItem albumCover="https://upload.wikimedia.org/wikipedia/en/5/5e/MacDeMarcoThisOldDog.png" albumArtist="Mac DeMarco" albumName="This Old Dog"/>
          <AlbumDisplayItem albumCover="https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg" albumArtist="Kanye West" albumName="Graduation"/>
          <AlbumDisplayItem albumCover="https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png" albumArtist="Pink Floyd" albumName="The Dark Side of the Moon"/>
          <AlbumDisplayItem albumCover="https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg" albumArtist="Frank Ocean" albumName="Blonde"/>
          <AlbumDisplayItem albumCover="https://upload.wikimedia.org/wikipedia/en/c/c1/Grimes_-_Visions_album_cover.png" albumArtist="Grimes" albumName="Visions"/>
          <AlbumDisplayItem albumCover="https://m.media-amazon.com/images/I/715LZJ5qX0L._UF1000,1000_QL80_.jpg" albumArtist="Radiohead" albumName="OK Computer"/>
          <AlbumDisplayItem albumCover="https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795" albumArtist="Juice WRLD" albumName="Goodbye & Good Riddance"/>
          <AlbumDisplayItem albumCover="https://m.media-amazon.com/images/I/71YMac+JmAL._UF1000,1000_QL80_.jpg" albumArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)"/>
          <AlbumDisplayItem albumCover="https://m.media-amazon.com/images/I/A1LVEJikmZL._UF1000,1000_QL80_.jpg" albumArtist="Tame Impala" albumName="Currents"/>
          <AlbumDisplayItem albumCover="https://upload.wikimedia.org/wikipedia/en/6/65/Luv_Is_Rage_2_cover.jpg" albumArtist="Lil Uzi Vert" albumName="Luv is Rage 2"/>
          <AlbumDisplayItem albumCover="https://upload.wikimedia.org/wikipedia/en/d/d1/Duster_-_Stratosphere_front_cover.jpg" albumArtist="Duster" albumName="Stratosphere"/>
          <AlbumDisplayItem albumCover="https://upload.wikimedia.org/wikipedia/en/a/ae/Drake_-_Take_Care_cover.jpg" albumArtist="Drake" albumName="Take Care"/>
          <AlbumDisplayItem albumCover="https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG" albumArtist="Fleetwood Mac" albumName="Rumors"/>
          <AlbumDisplayItem albumCover="https://m.media-amazon.com/images/I/71RDpVmr2hL._UF1000,1000_QL80_.jpg" albumArtist="Travis Scott" albumName="Rodeo"/>
          <AlbumDisplayItem albumCover="https://i.discogs.com/UKQUFdd3iSkKB1aLVuIeUf_ekukXNGxN9MgrEUZyMds/rs:fit/g:sm/q:90/h:596/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzMzI5/MjMyLTE1NTIxODE0/ODUtNDY3OC5qcGVn.jpeg" albumArtist="Mac DeMarco" albumName="Salad Days"/>
          <AlbumDisplayItem albumCover="https://m.media-amazon.com/images/I/411pMy47xvS._UF1000,1000_QL80_.jpg" albumArtist="Metallica" albumName="Metallica"/>
          <AlbumDisplayItem albumCover="https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f" albumArtist="Kanye West" albumName="My Beautiful Dark Twisted Fantasy"/>
        </SimpleGrid>
      </CardBody>
    </Card>
  );
}
