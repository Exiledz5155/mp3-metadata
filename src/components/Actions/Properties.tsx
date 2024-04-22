import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { Album, Song } from "../../types/types";

interface PropertiesComponentProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Song[];
}

interface CommonSongProperties {
  title: string;
  artist: string;
  album: string;
  year: string;
  genre: string;
  albumArtist: string;
  trackNumber: string;
  id: string;
  duration: string;
}

export default function Properties({
  songs,
  isOpen,
  onClose,
}: PropertiesComponentProps) {
  const commonProperties = songs.reduce<CommonSongProperties>(
    (acc, song, index) => {
      if (index === 0) {
        // Initialize with the first song's properties, assuming all songs have the same type of properties
        return {
          title: song.title,
          artist: song.artist,
          album: song.album,
          year: song.year.toString(),
          genre: song.genre,
          albumArtist: song.artist, // Adjust based on your actual data structure
          trackNumber: song.trackNumber?.toString() || "",
          id: song.id.toString(),
          duration: song.duration.toString(),
        };
      } else {
        // Compare and set 'various' if different
        return {
          title: acc.title === song.title ? song.title : "Various",
          artist: acc.artist === song.artist ? song.artist : "Various",
          album: acc.album === song.album ? song.album : "Various",
          year:
            acc.year === song.year.toString()
              ? song.year.toString()
              : "Various",
          genre: acc.genre === song.genre ? song.genre : "Various",
          albumArtist:
            acc.albumArtist === song.artist ? song.artist : "Various",
          trackNumber:
            acc.trackNumber === song.trackNumber.toString()
              ? song.trackNumber.toString()
              : "Various",
          id: acc.id === song.id.toString() ? song.id.toString() : "Various",
          duration:
            acc.duration === song.duration.toString()
              ? song.duration.toString()
              : "Various",
        };
      }
    },
    {
      title: "Various",
      artist: "Various",
      album: "Various",
      year: "Various",
      genre: "Various",
      albumArtist: "Various",
      trackNumber: "Various",
      id: "Various",
      duration: "Various", // SUM UP THE DURATION INSTEAD
    }
  );

  const PropertyRow = ({ label, value }) => (
    <HStack justifyContent="space-between">
      <Text fontWeight="semibold">{label}</Text>
      <Text>{value}</Text>
    </HStack>
  );

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent bg={"brand.200"} pb={25} borderRadius={"xl"}>
          <ModalHeader>Properties</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              <PropertyRow label="Title" value={commonProperties.title || ""} />
              <PropertyRow
                label="Artist(s)"
                value={commonProperties.artist || ""}
              />
              <PropertyRow label="Album" value={commonProperties.album || ""} />
              <PropertyRow
                label="Album Artist(s)"
                value={commonProperties.artist || ""}
              />
              <PropertyRow
                label="Year"
                value={commonProperties.year?.toString() || ""}
              />
              <PropertyRow label="Genre" value={commonProperties.genre || ""} />
              <PropertyRow
                label="Track"
                value={commonProperties.trackNumber?.toString() || ""}
              />
              <PropertyRow
                label="Length"
                value={commonProperties.duration || ""}
              />
              <PropertyRow label="dev_id" value={commonProperties.id || ""} />
            </VStack>
          </ModalBody>

          <ModalFooter pb={0}>
            <Button
              bgGradient="linear(to-r, linear.100, linear.200)"
              size="md"
              w={"100%"}
              variant="solid"
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
