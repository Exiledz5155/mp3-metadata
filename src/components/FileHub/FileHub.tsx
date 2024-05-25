// app/providers.tsx
"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  Icon,
  Search2Icon,
} from "@chakra-ui/icons";
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
  useDisclosure,
  HStack,
  Skeleton,
  Image,
  Center,
  useToast,
  Spinner,
  Tooltip,
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
import Fuse from "fuse.js";
import Link from "next/link";
import { MdHomeFilled } from "react-icons/md";

export function FileHub() {
  const { uuid, generateUUID } = useUUID();
  const { fetchAlbums, refetchData } = useFetch();
  const [albums, setAlbums] = useState<Album[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { selectedSongs, setSelectedSongs } = useSelectedSongs();

  const [isRightClicked, setIsRightClicked] = useState(false);
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
  const [expandedIndices, setExpandedIndices] = useState<number[]>([]);

  useEffect(() => {
    const fetchAlbumsWrapper = async () => {
      try {
        let albums = await fetchAlbums(uuid);
        if (albums) {
          const untaggedIndex = albums.findIndex(
            (album) => album.album === "Untagged"
          ) as number;
          if (untaggedIndex !== 1) {
            const [untaggedAlbum] = albums.splice(untaggedIndex, 1);
            albums.unshift(untaggedAlbum);
          }
        }

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

  const fuseOptions = {
    keys: ["album", "songs.title"],
    threshold: 0.4,
    includeMatches: true,
  };

  const fuse = useMemo(
    () => new Fuse(initialAlbums || [], fuseOptions),
    [initialAlbums]
  );

  const filterAlbumsAndSongs = useMemo(() => {
    return (albums: Album[], query: string) => {
      if (!query) return albums;
      const result = fuse.search(query);
      return result.map((res) => ({
        ...res.item,
        matches: res.matches,
        songs: res.item.songs.map((song) => ({
          ...song,
          matches: res.matches?.some(
            (match) => match.key === "songs.title" && match.value === song.title
          ),
        })),
      }));
    };
  }, [fuse]);

  const updateExpandedIndices = (
    filteredAlbums: Album[],
    query: string
  ): void => {
    if (query === "") {
      setExpandedIndices([]);
    } else {
      const indices: number[] = filteredAlbums.reduce(
        (acc: number[], album, index) => {
          const albumMatches = album.album
            .toLowerCase()
            .includes(query.toLowerCase());
          const songMatches = album.songs.some((song) =>
            song.title.toLowerCase().includes(query.toLowerCase())
          );

          if (albumMatches || songMatches) {
            acc.push(index);
          }
          return acc;
        },
        []
      );

      setExpandedIndices(indices);
    }
  };

  useEffect(() => {
    if (initialAlbums) {
      let filteredAlbums = filterAlbumsAndSongs(initialAlbums, searchQuery);

      if (sortOrder === "asc") {
        filteredAlbums.sort((a, b) => a.album.localeCompare(b.album));
      } else if (sortOrder === "desc") {
        filteredAlbums.sort((a, b) => b.album.localeCompare(a.album));
      }

      setAlbums(filteredAlbums);
      updateExpandedIndices(filteredAlbums, searchQuery);
    }
  }, [sortOrder, searchQuery, initialAlbums, filterAlbumsAndSongs]);

  useEffect(() => {
    console.log("Current Expanded Indices: ", expandedIndices);
  }, [expandedIndices]);

  const handleSortOrderChange = (order: "default" | "asc" | "desc") => {
    setSortOrder(order);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    setSelectedSongs([]);
  };

  const handleAlbumRightClick = (
    album: Album,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    setIsRightClicked(true);
    setRightClickPosition({ x: event.clientX, y: event.clientY });
    setToView(true);
    setSelectedAlbum(album);
    const songIds = album.songs.map((song) => song.id);
    setSelectedSongs(songIds);
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
            pb="3"
            w="100%"
            sx={{
              caretColor: "white",
            }}
          >
            <InputLeftElement pointerEvents="none">
              <Search2Icon color="whiteAlpha.700" />
            </InputLeftElement>
            <Input
              color="whiteAlpha.700"
              placeholder="Search"
              borderColor="brand.400"
              _hover={{ borderColor: "brand.400" }}
              _focus={{
                borderColor: "brand.400",
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
            mb={3}
            onClick={() => {
              onOpen();
            }}
          >
            Upload Files
          </Button>

          <HStack
            w={"100%"}
            justifyContent={"space-between"}
            borderColor={"brand.400"}
            mb={3}
          >
            <Link href="/editor/songs" style={{ flex: 1 }}>
              <Button
                variant="outline"
                w="100%"
                color={"whiteAlpha.800"}
                _hover={{ bg: "brand.300" }}
                borderColor={"brand.400"}
                bg={"brand.100"}
              >
                View all
              </Button>
            </Link>
          </HStack>

          <FileUploadBox isOpen={isOpen} onClose={onClose} />
        </Box>
        <Box
          overflowY={"auto"}
          css={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
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
          <HStack
            w={"100%"}
            justifyContent={"space-between"}
            alignItems="center"
            mb={3}
          >
            <Link href="/editor/albums">
              <Tooltip
                hasArrow
                label="View Albums"
                placement="right"
                bg={"brand.300"}
                color={"white"}
              >
                <Button h="30px" variant={"ghost"} w="20px">
                  <Icon
                    color={"whiteAlpha.800"}
                    boxSize={5}
                    as={MdHomeFilled}
                  ></Icon>
                </Button>
              </Tooltip>
            </Link>
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                h="30px"
                w="100px"
                color={"whiteAlpha.800"}
              >
                Sort By:
                <ChevronDownIcon ml={1} />
              </MenuButton>
              <MenuList bg="brand.200">
                <MenuItem
                  bg={sortOrder === "default" ? "brand.400" : "brand.200"}
                  _hover={{
                    bg: sortOrder === "default" ? "brand.400" : "brand.300",
                  }}
                  onClick={() => handleSortOrderChange("default")}
                >
                  Default
                </MenuItem>
                <MenuItem
                  bg={sortOrder === "asc" ? "brand.400" : "brand.200"}
                  _hover={{
                    bg: sortOrder === "asc" ? "brand.400" : "brand.300",
                  }}
                  onClick={() => handleSortOrderChange("asc")}
                >
                  A-Z <ChevronUpIcon />
                </MenuItem>
                <MenuItem
                  bg={sortOrder === "desc" ? "brand.400" : "brand.200"}
                  _hover={{
                    bg: sortOrder === "desc" ? "brand.400" : "brand.300",
                  }}
                  onClick={() => handleSortOrderChange("desc")}
                >
                  Z-A <ChevronDownIcon />
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
          <Accordion
            index={expandedIndices}
            onChange={(indices) => setExpandedIndices(indices as number[])}
            allowMultiple
            sx={{
              width: "100%",
              ".chakra-accordion__item": {
                borderTop: "none",
                borderBottom: "none",
                borderBottomRadius: "lg",
                padding: "0",
                margin: "0",
              },
              ".chakra-accordion__button": {
                padding: "0",
              },
              ".chakra-accordion__panel": {
                padding: "0",
              },
              ".chakra-accordion__button:focus": {
                boxShadow: "none",
              },
            }}
          >
            {!isLoaded ? (
              <React.Fragment>
                {Array.from({ length: 10 }, (_, i) => (
                  <Box key={i} borderRadius={"lg"} h="55px" overflow="hidden">
                    <HStack spacing="10px">
                      <Center w="55px" h="55px">
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
                return (
                  <FileHubAlbum
                    key={index}
                    album={album}
                    onAlbumRightClick={handleAlbumRightClick}
                    onCardRightClick={handleCardRightClick}
                    searchQuery={searchQuery}
                    expandedIndices={expandedIndices}
                    setExpandedIndices={setExpandedIndices}
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
