// app/providers.tsx
"use client";

import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  CardBody,
  useColorModeValue,
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  Accordion,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuOptionGroup,
  useDisclosure,
  HStack,
  Text,
  Skeleton,
  AccordionButton,
  AccordionItem,
  Image,
  Center,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import { FileHubAlbum } from "./FileHubAlbum";
import React, { useEffect, useState } from "react";
import FileUploadBox from "./UploadBox";
import { IoCloudUploadOutline } from "react-icons/io5";
import ActionMenu from "../Actions/ActionMenu";
import { useUUID } from "../../contexts/UUIDContext";
import { Album, Song } from "../../types/types";
import { useFetch } from "../../contexts/FetchContext";
import { useSelectedSongs } from "../../contexts/SelectedSongsContext";
import Edit from "../Actions/Edit";
import Properties from "../Actions/Properties";
import { useMemo } from "react";

// hardcode data
// const albumData = require("../../../public/albums.json");

export function FileHub() {
  const { uuid, generateUUID } = useUUID();
  const { fetchAlbums, refetchData } = useFetch();
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchAlbumsWrapper = async () => {
      try {
        const albums = await fetchAlbums(uuid);
        setAlbums(albums);
        setInitialAlbums(albums);
        setIsLoaded(true);
      } catch (error) {
        setError("Failed to fetch albums: " + error.message);
        console.error(error);
        setIsLoaded(true);
      }
    };

    fetchAlbumsWrapper();
  }, [fetchAlbums, uuid, refetchData]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { selectedSongs, setSelectedSongs } = useSelectedSongs();

  // Use state to track whether the card is right clicked
  const [isRightClicked, setIsRightClicked] = useState(false);
  // x,y coordinates of where the right click menu should be
  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPropertiesModalOpen, setIsPropertiesModalOpen] = useState(false);
  const [toView, setToView] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [sortOrder, setSortOrder] = useState<"default" | "asc" | "desc">(
    "default"
  );
  const [initialAlbums, setInitialAlbums] = useState<Album[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Searching
  // const filterAlbumsAndSongs = (albums: Album[], query: string) => {
  //   if (!query) return albums;
  //   const lowercasedQuery = query.toLowerCase();
  //   return albums.filter(
  //     (album) =>
  //       album.album.toLowerCase().includes(lowercasedQuery) ||
  //       album.songs.some((song) =>
  //         song.title.toLowerCase().includes(lowercasedQuery)
  //       )
  //   );
  // };

  const filterAlbumsAndSongs = (albums, query) => {
    if (!query) return albums;
    const lowercasedQuery = query.toLowerCase();
    return albums.filter(
      (album) =>
        album.album.toLowerCase().includes(lowercasedQuery) ||
        album.songs.some((song) => {
          const songTitle = song.title.toLowerCase();
          if (songTitle.includes(lowercasedQuery)) {
            console.log(
              `Match found: "${song.title}" from the album "${album.album}" (matched song title)`
            );
            return true;
          }
          return false;
        })
    );
  };

  useEffect(() => {
    if (initialAlbums) {
      let filteredAlbums = filterAlbumsAndSongs(initialAlbums, searchQuery);

      if (sortOrder === "asc") {
        filteredAlbums = [...filteredAlbums].sort((a, b) =>
          a.album.localeCompare(b.album)
        );
      } else if (sortOrder === "desc") {
        filteredAlbums = [...filteredAlbums].sort((a, b) =>
          b.album.localeCompare(a.album)
        );
      }

      setAlbums(filteredAlbums);
    }
  }, [sortOrder, searchQuery, initialAlbums]);

  const handleSortOrderChange = (order: "default" | "asc" | "desc") => {
    setSortOrder(order);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setSelectedSongs([]); // Deselect all songs when searching
  };

  const handleAlbumRightClick = (
    album: Album,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsRightClicked(true);
    setRightClickPosition({ x: event.clientX, y: event.clientY });
    setToView(true); // Set toView to true for FileHubAlbum right-click
    setSelectedAlbum(album); // Set selected album
    const songIds = album.songs.map((song) => song.id); // Extract song IDs
    setSelectedSongs(songIds); // Set the selected songs
  };

  const handleCardRightClick = (
    songId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    if (!selectedSongs.includes(songId)) {
      setSelectedSongs([songId]);
    }
    setIsRightClicked(true);
    setRightClickPosition({ x: event.clientX, y: event.clientY });
    setToView(false);
  };

  const closeMenu = () => {
    setIsRightClicked(false);
  };

  const openEditModal = () => {
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const openPropertiesModal = () => {
    setIsPropertiesModalOpen(true);
  };

  const closePropertiesModal = () => {
    setIsPropertiesModalOpen(false);
  };

  const selectedSongObjects = selectedSongs
    .map((id) => {
      let song: Song | undefined;
      albums?.forEach((album) => {
        const foundSong = album.songs.find((s) => s.id === id);
        if (foundSong) {
          song = foundSong;
        }
      });
      return song;
    })
    .filter((song): song is Song => song !== undefined);

  // Handle download
  const toast = useToast();
  const handleDownload = async () => {
    const songIds = selectedSongObjects.map((song) => song.id);
    const downloadUrl = `/api/download?uuid=${uuid}&ids=${songIds.join(",")}`;

    try {
      const downloadPromise = fetch(downloadUrl).then(async (response) => {
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "songs.zip");
          document.body.appendChild(link);
          link.click();
          link.remove();
        } else {
          throw new Error("Download failed.");
        }
      });
      toast.promise(downloadPromise, {
        loading: {
          render: () => (
            <Box
              display="flex"
              alignItems="center"
              bgGradient="linear(to-r, linear.100, linear.200)"
              color="black"
              p={3}
              borderRadius="md"
              boxShadow="lg"
            >
              <Spinner size="md" mr={3} />
              <Box>
                <strong>Download in Progress</strong>
                <br />
                Please wait while your songs are being downloaded.
              </Box>
            </Box>
          ),
        },
        success: {
          title: "Download Completed",
          description: "Your songs have been downloaded successfully.",
        },
        error: {
          title: "Download Failed",
          description: "An error occurred while downloading your songs.",
        },
      });
    } catch (error) {
      console.error("Error during download:", error);
    }
  };

  return (
    <Card
      bg={useColorModeValue("white", "brand.100")}
      h={"100%"}
      maxHeight="calc(100vh - 90px)"
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
          <InputGroup
            pb="5"
            w="100%"
            sx={{
              caretColor: "white",
            }}
          >
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="linear.100" />
            </InputLeftElement>
            <Input
              color="linear.100"
              placeholder="Search files"
              borderColor="linear.100"
              _hover={{ borderColor: "linear.100" }}
              _focus={{
                borderColor: "linear.100",
                boxShadow: "none",
              }}
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
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
          <HStack justifyContent={"right"}>
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                h="30px"
                w="100px"
                bottom="10px"
              >
                Sort By:
                <ChevronDownIcon />
              </MenuButton>
              <MenuList bg="brand.100">
                <MenuItem
                  bg="brand.100"
                  _hover={{ bg: "brand.200" }}
                  onClick={() => handleSortOrderChange("default")}
                >
                  Default
                </MenuItem>
                <MenuItem
                  bg="brand.100"
                  _hover={{ bg: "brand.200" }}
                  onClick={() => handleSortOrderChange("asc")}
                >
                  A-Z <ChevronUpIcon />
                </MenuItem>
                <MenuItem
                  bg="brand.100"
                  _hover={{ bg: "brand.200" }}
                  onClick={() => handleSortOrderChange("desc")}
                >
                  Z-A <ChevronDownIcon />
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </Box>
        <Box
          overflowY={"auto"}
          css={{
            display: "flex", // Set display to flex
            flexDirection: "column", // Arrange children in a column
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
          }}
        >
          <Accordion
            allowMultiple
            sx={{
              width: "100%",
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
            // onContextMenu={handleRightClick} idk what this is
          >
            {!isLoaded ? (
              // "Lets you group elements without a wrapper node"
              <React.Fragment>
                {Array.from({ length: 10 }, (_, i) => (
                  <Box key={i} borderRadius={"lg"} h="55px" overflow="hidden">
                    <HStack spacing="10px">
                      <Center w="55px" h="55px">
                        {/* UPDATE TO KEEP CHECKING FOR FIRST IMAGE */}
                        <Skeleton
                          borderRadius="base"
                          boxSize="45px"
                          startColor="brand.200"
                          endColor="brand.400"
                          fadeDuration={1}
                        >
                          <Image
                            src={
                              "https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
                            }
                            borderRadius="base"
                            boxSize="45px"
                          />
                        </Skeleton>
                      </Center>
                      <Skeleton
                        noOfLines={1}
                        maxW={200}
                        startColor="brand.200"
                        endColor="brand.400"
                        fadeDuration={1}
                      >
                        Placeholder Album Title Placeholder Album Title
                        Placeholder Album Title Placeholder Album Title
                        Placeholder Album Title
                      </Skeleton>
                    </HStack>
                  </Box>
                ))}
              </React.Fragment>
            ) : (
              albums &&
              albums.length > 0 &&
              albums.map((album, index) => {
                // console.log(album.album); // REMOVE
                return (
                  <FileHubAlbum
                    key={index}
                    album={album}
                    onAlbumRightClick={handleAlbumRightClick}
                    onCardRightClick={handleCardRightClick}
                  />
                );
              })
            )}
          </Accordion>
          {isRightClicked && (
            <ActionMenu
              album={selectedAlbum}
              songs={selectedSongObjects}
              position={rightClickPosition}
              onClose={closeMenu}
              onEditClick={openEditModal}
              onPropertiesClick={openPropertiesModal}
              onDownloadClick={handleDownload}
              toView={toView}
            />
          )}
          <Edit
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            songs={selectedSongObjects}
          />
          <Properties
            isOpen={isPropertiesModalOpen}
            onClose={closePropertiesModal}
            songs={selectedSongObjects}
          />
        </Box>
      </CardBody>
    </Card>
  );
}
