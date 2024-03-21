// app/providers.tsx
"use client";

import { AddIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  useColorModeValue,
  Text,
  Input,
  Image,
  Center,
  Box,
  InputGroup,
  InputLeftElement,
  HStack,
  Spacer,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  useDisclosure,
} from "@chakra-ui/react";
import { FileHubAlbumCard } from "./FileHubAlbumCard";
import { FileHubAlbum } from "./FileHubAlbum";
import React, { useRef, useState } from "react";
import { FileUploadBox } from "./FileUploadBox";
import { IoCloudUploadOutline } from "react-icons/io5";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export function FileHub() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const demonDaysAlbumCards = [
    <FileHubAlbumCard songName="Kids With Guns" songArtist="Gorillaz" songLength="3:46"/>,
    <FileHubAlbumCard songName="Dirty Harry" songArtist="Gorillaz" songLength="3:44"/>,
    <FileHubAlbumCard songName="Feel Good Inc." songArtist="Gorillaz" songLength="3:41"/>,
  ];

  const thisOldDogAlbumCards = [
    <FileHubAlbumCard songName="This Old Dog" songArtist="Mac DeMarco" songLength="2:31"/>,
    <FileHubAlbumCard songName="For the First Time" songArtist="Mac DeMarco" songLength="3:02"/>,
    <FileHubAlbumCard songName="On the Level" songArtist="Mac DeMarco" songLength="3:48"/>,
    <FileHubAlbumCard songName="Moonlight on the River" songArtist="Mac DeMarco" songLength="7:03"/>,
  ];

  const graduationAlbumCards = [
    <FileHubAlbumCard songName="Good Morning" songArtist="Kanye West" songLength="3:15"/>,
    <FileHubAlbumCard songName="Stronger" songArtist="Kanye West" songLength="5:12"/>,
    <FileHubAlbumCard songName="I Wonder" songArtist="Kanye West" songLength="4:03"/>,
    <FileHubAlbumCard songName="Good Life (feat. T-Pain)" songArtist="Kanye West" songLength="3:27"/>,
    <FileHubAlbumCard songName="Can't Tell Me Nothing" songArtist="Kanye West" songLength="4:31"/>,
    <FileHubAlbumCard songName="Flashing Lights (feat. Dwele)" songArtist="Kanye West" songLength="3:57"/>,
    <FileHubAlbumCard songName="Homecoming (feat. Chris Martin)" songArtist="Kanye West" songLength="3:23"/>,
  ];

  const theDarkSideAlbumCards = [
    <FileHubAlbumCard songName="Breathe (In the Air)" songArtist="Pink Floyd" songLength="2:46"/>,
    <FileHubAlbumCard songName="Time" songArtist="Pink Floyd" songLength="7:04"/>,
    <FileHubAlbumCard songName="The Great Gig In the Sky" songArtist="Pink Floyd" songLength="4:44"/>,
    <FileHubAlbumCard songName="Money" songArtist="Pink Floyd" songLength="6:30"/>,
    <FileHubAlbumCard songName="Us and Them" songArtist="Pink Floyd" songLength="7:36"/>,
    <FileHubAlbumCard songName="Any Colour You Like" songArtist="Pink Floyd" songLength="3:26"/>,
    <FileHubAlbumCard songName="Brain Damage" songArtist="Pink Floyd" songLength="3:51"/>,
    <FileHubAlbumCard songName="Eclipse" songArtist="Pink Floyd" songLength="2:07"/>,
  ];

  return (
    <Card
      bg={useColorModeValue("white", "brand.100")}
      h={"100%"}
      maxH={"93.25vh"}
      p={"20px"}
      rounded={"xl"}
    >
      <CardBody
        overflow={"hidden"}
        p={"0"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Box bg="brand.100">
          {/* BUG FIX CARET NOT UPDATING AFTER TEXT REACHS END OF INPUT BOX */}
          <InputGroup
            pb="5"
            w="100%"
            bg="linear.100"
            bgClip={"text"}
            sx={{
              caretColor: "white",
            }}
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="linear.100" />
            </InputLeftElement>
            <Input
              placeholder="Search files"
              borderColor="linear.100"
              _hover={{ borderColor: "linear.100" }}
              _focus={{
                borderColor: "linear.100",
                boxShadow: "none",
              }}
              type="text"
            />
          </InputGroup>

          <Button
            leftIcon={<IoCloudUploadOutline size="24px" />}
            w="100%"
            bgGradient="linear(to-r, linear.100, linear.200)"
            _hover={{ color: "white", bg: "brand.300" }}
            color={"brand.200"}
            mb={5}
            onClick={() => {
              onOpen();
            }}
          >
            Upload Files
          </Button>
          <FileUploadBox isOpen={isOpen} onClose={onClose} />
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              variant="ghost"
              h="30px"
              w="70px"
              bottom="10px"
            >
              Filter
            </MenuButton>
            <MenuList bg="brand.100">
              <MenuOptionGroup type="checkbox">
                <MenuItemOption bg="brand.100" _hover={{ bg: "brand.200" }}>
                  Genre
                </MenuItemOption>
                <MenuItemOption bg="brand.100" _hover={{ bg: "brand.200" }}>
                  Year
                </MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              h="30px"
              w="100px"
              left="120px"
              bottom="10px"
            >
              Sort By:
              <ChevronDownIcon />
            </MenuButton>
            <MenuList bg="brand.100">
              <MenuItem bg="brand.100" _hover={{ bg: "brand.200" }}>
                A-Z
              </MenuItem>
              <MenuItem bg="brand.100" _hover={{ bg: "brand.200" }}>
                Artist
              </MenuItem>
              <MenuItem bg="brand.100" _hover={{ bg: "brand.200" }}>
                Recently Added
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
        <Box 
          overflowY={"auto"}
          css={{
            display: "flex",  // Set display to flex
            flexDirection: "column",  // Arrange children in a column
            alignItems: "flex-start", // Align children to the start of the flex container
            "&::-webkit-scrollbar": {
              width: "5px",
            },
            "&::-webkit-scrollbar-track": {
              background: "transparent",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555",
            },
          }}>
          <Accordion
            allowMultiple
            sx={{
              ".chakra-accordion__item": {
                borderTop: "none",
                borderBottom: "none",
                borderBottomRadius: "lg", // WORKS BUT DOESN'T AFFECT ALBUMCARD
                padding: "0", // Remove padding from accordion item
                margin: "0", // Remove margin from accordion item
              },
              ".chakra-accordion__button": {
                padding: "0", // Remove padding from accordion button
              },
              ".chakra-accordion__panel": {
                padding: "0", // Remove padding from accordion panel
              },
              ".chakra-accordion__button:focus": {
                boxShadow: "none",
              },
            }}
          >

          <FileHubAlbum albumCards={demonDaysAlbumCards} albumCover="https://upload.wikimedia.org/wikipedia/en/d/df/Gorillaz_Demon_Days.PNG" albumArtist="Gorillaz" albumName="Demon Days"/>
          <FileHubAlbum albumCards={thisOldDogAlbumCards} albumCover="https://upload.wikimedia.org/wikipedia/en/5/5e/MacDeMarcoThisOldDog.png" albumArtist="Mac DeMarco" albumName="This Old Dog"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://upload.wikimedia.org/wikipedia/en/7/70/Graduation_%28album%29.jpg" albumArtist="Kanye West" albumName="Graduation"/>
          <FileHubAlbum albumCards={theDarkSideAlbumCards} albumCover="https://upload.wikimedia.org/wikipedia/en/3/3b/Dark_Side_of_the_Moon.png" albumArtist="Pink Floyd" albumName="The Dark Side of the Moon"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://upload.wikimedia.org/wikipedia/en/a/a0/Blonde_-_Frank_Ocean.jpeg" albumArtist="Frank Ocean" albumName="Blonde"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://upload.wikimedia.org/wikipedia/en/c/c1/Grimes_-_Visions_album_cover.png" albumArtist="Grimes" albumName="Visions"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://m.media-amazon.com/images/I/715LZJ5qX0L._UF1000,1000_QL80_.jpg" albumArtist="Radiohead" albumName="OK Computer"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795" albumArtist="Juice WRLD" albumName="Goodbye & Good Riddance"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://m.media-amazon.com/images/I/71YMac+JmAL._UF1000,1000_QL80_.jpg" albumArtist="Kendrick Lamar" albumName="good kid, m.A.A.d city (Deluxe)"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://m.media-amazon.com/images/I/A1LVEJikmZL._UF1000,1000_QL80_.jpg" albumArtist="Tame Impala" albumName="Currents"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://upload.wikimedia.org/wikipedia/en/6/65/Luv_Is_Rage_2_cover.jpg" albumArtist="Lil Uzi Vert" albumName="Luv is Rage 2"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://upload.wikimedia.org/wikipedia/en/d/d1/Duster_-_Stratosphere_front_cover.jpg" albumArtist="Duster" albumName="Stratosphere"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://upload.wikimedia.org/wikipedia/en/a/ae/Drake_-_Take_Care_cover.jpg" albumArtist="Drake" albumName="Take Care"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://upload.wikimedia.org/wikipedia/en/f/fb/FMacRumours.PNG" albumArtist="Fleetwood Mac" albumName="Rumors"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://m.media-amazon.com/images/I/71RDpVmr2hL._UF1000,1000_QL80_.jpg" albumArtist="Travis Scott" albumName="Rodeo"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://i.discogs.com/UKQUFdd3iSkKB1aLVuIeUf_ekukXNGxN9MgrEUZyMds/rs:fit/g:sm/q:90/h:596/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTEzMzI5/MjMyLTE1NTIxODE0/ODUtNDY3OC5qcGVn.jpeg" albumArtist="Mac DeMarco" albumName="Salad Days"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://m.media-amazon.com/images/I/411pMy47xvS._UF1000,1000_QL80_.jpg" albumArtist="Metallica" albumName="Metallica"/>
          <FileHubAlbum albumCards={graduationAlbumCards} albumCover="https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f" albumArtist="Kanye West" albumName="My Beautiful Dark Twisted Fantasy"/>
          </Accordion>
        </Box>
      </CardBody>
    </Card>
  );
}
