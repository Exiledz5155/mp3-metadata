// app/providers.tsx
"use client";

import {
  Card,
  CardBody,
  Divider,
  Box,
  Toast,
  background,
  Spinner,
  useToast,
  Flex,
  HStack,
  Tooltip,
  Text,
  Button,
} from "@chakra-ui/react";
import { SongGridCard } from "./SongGridCard";
import { SongGridLabel } from "./SongGridLabel";
import { AlbumInfoSection } from "./AlbumInfoSection";
import { Album, Song } from "../../types/types";
import { useState } from "react";
import ActionMenu from "../Actions/ActionMenu";
import Edit from "../Actions/Edit";
import Properties from "../Actions/Properties";
import { useUUID } from "../../contexts/UUIDContext";
import {
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Icon,
  TimeIcon,
  WarningIcon,
} from "@chakra-ui/icons";

export function SongDisplay({ album }: { album: Album }) {
  const { uuid } = useUUID();
  const [selectedSongs, setSelectedSongs] = useState<string[]>([]);
  const [rightClickedSong, setRightClickedSong] = useState<Song | null>(null);
  const [rightClickPosition, setRightClickPosition] = useState({ x: 0, y: 0 });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPropertiesModalOpen, setIsPropertiesModalOpen] = useState(false);
  const [sortCriteria, setSortCriteria] = useState({
    field: "trackNumber",
    order: "asc",
  });

  // sorting songs
  const getSortedSongs = () => {
    return [...album.songs].sort((a, b) => {
      const isAsc = sortCriteria.order === "asc";
      let aValue = a[sortCriteria.field];
      let bValue = b[sortCriteria.field];

      if (sortCriteria.field === "duration") {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
        return isAsc ? aValue - bValue : bValue - aValue;
      } else {
        if (a[sortCriteria.field] < b[sortCriteria.field]) {
          return isAsc ? -1 : 1;
        }
        if (a[sortCriteria.field] > b[sortCriteria.field]) {
          return isAsc ? 1 : -1;
        }
      }
      return 0;
    });
  };

  const sortedSongs = getSortedSongs();

  const handleSortChange = (field) => {
    setSortCriteria((prev) => ({
      field,
      order: prev.field === field && prev.order === "asc" ? "desc" : "asc",
    }));
  };

  const SortButton = ({ field, children, w = "auto", center = false }) => {
    const isActive = sortCriteria.field === field;
    const directionIcon =
      sortCriteria.order === "asc" ? (
        <ChevronUpIcon color={"green.200"} />
      ) : (
        <ChevronDownIcon color={"red.300"} />
      );

    return (
      <Button
        variant="unstyled"
        onClick={() => handleSortChange(field)}
        _focus={{ boxShadow: "none" }}
        w={w}
      >
        <Flex
          align="center"
          justify={center ? "center" : "start"}
          color="white"
          w="100%"
        >
          {children}
          {isActive && directionIcon}
        </Flex>
      </Button>
    );
  };

  // Action Menu handling
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

  // Selection handling and right click
  const handleSelectSong = (
    songId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    // Get the current sorted order of songs
    const currentSortedOrder = getSortedSongs();

    if (event.shiftKey) {
      // Find indices in the sorted array
      const lastSelectedId = selectedSongs[selectedSongs.length - 1];
      const currentIdx = currentSortedOrder.findIndex(
        (song) => song.id === songId
      );
      const lastIdx = currentSortedOrder.findIndex(
        (song) => song.id === lastSelectedId
      );
      const range = [currentIdx, lastIdx].sort((a, b) => a - b);

      // Select the range of songs based on sorted order
      const newSelectedSongs = currentSortedOrder
        .slice(range[0], range[1] + 1)
        .map((song) => song.id);
      setSelectedSongs(newSelectedSongs);
    } else if (event.ctrlKey || event.metaKey) {
      setSelectedSongs((prev) =>
        prev.includes(songId)
          ? prev.filter((id) => id !== songId)
          : [...prev, songId]
      );
    } else {
      setSelectedSongs([songId]);
    }
  };

  const handleRightClick = (
    songId: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    const song = album.songs.find((song) => song.id === songId);
    if (!song) return;

    if (!selectedSongs.includes(songId)) {
      setSelectedSongs([songId]);
    }

    setRightClickedSong(song);
    setRightClickPosition({ x: event.clientX, y: event.clientY });
  };

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

  const closeMenu = () => {
    setRightClickedSong(null);
  };

  // Map selected song IDs to Song objects
  const selectedSongObjects = selectedSongs
    .map((id) => album.songs.find((song) => song.id === id))
    .filter((song): song is Song => song !== undefined);

  return (
    <Card
      p={"20px"}
      bg="brand.100"
      h="100%"
      rounded={"xl"}
      maxHeight="calc(100vh - 90px)"
      overflow={"hidden"}
    >
      <AlbumInfoSection album={album} />
      <HStack
        align={"left"}
        borderRadius={"10px"}
        position={"sticky"}
        bg="brand.100"
        top="0px"
        mt={5}
      >
        <Flex align={"center"} w="30%">
          {/* Work around for duration since it needs to be horizontally centered */}
          <Text
            as={"button"}
            fontSize={"md"}
            mx={"4"}
            onClick={() => handleSortChange("trackNumber")}
            sx={{ userSelect: "none" }} // Disables text selection
            color={"whiteAlpha.800"}
          >
            #
          </Text>
          <SortButton field="title">
            <Text textAlign={"left"} noOfLines={1} color={"whiteAlpha.800"}>
              Title
            </Text>
          </SortButton>
        </Flex>
        <SortButton field="artist" w="30%">
          <Text textAlign={"left"} noOfLines={1} color={"whiteAlpha.800"}>
            Artist(s)
          </Text>
        </SortButton>
        <SortButton field="album" w="30%">
          <Text textAlign={"left"} noOfLines={1} color={"whiteAlpha.800"}>
            Album
          </Text>
        </SortButton>
        <SortButton field="duration" w="10%" center={true}>
          <Text textAlign={"center"} noOfLines={1} color={"whiteAlpha.800"}>
            <Tooltip
              hasArrow
              label="Duration"
              aria-label="Duration"
              placement="top"
              bg={"brand.300"}
              color={"white"}
            >
              <Icon as={TimeIcon} />
            </Tooltip>
          </Text>
        </SortButton>
      </HStack>
      <Divider position={"sticky"} top="6" mb={2} />
      <CardBody
        m={"0"}
        p={"0"}
        display={"flex"}
        flexDirection={"column"}
        overflow={"auto"}
        css={{
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
        <Box>
          {sortedSongs.map((song, index) => (
            <SongGridCard
              key={song.id}
              song={song}
              isSelected={selectedSongs.includes(song.id)}
              onClick={handleSelectSong}
              onRightClick={handleRightClick}
            />
          ))}
        </Box>
      </CardBody>
      {rightClickedSong && (
        <ActionMenu
          songs={selectedSongObjects}
          position={rightClickPosition}
          onClose={closeMenu}
          onEditClick={openEditModal}
          onPropertiesClick={openPropertiesModal}
          onDownloadClick={handleDownload}
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
    </Card>
  );
}
