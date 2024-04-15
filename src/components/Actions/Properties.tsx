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
  song: Song;
}

export default function Properties({
  song,
  isOpen,
  onClose,
}: PropertiesComponentProps) {
  // New tag
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
              <PropertyRow label="Title" value={song.title} />
              <PropertyRow label="Artist(s)" value={song.artist} />
              <PropertyRow label="Album" value={song.album} />
              <PropertyRow label="Album Artist(s)" value={song.artist} />
              <PropertyRow label="Year" value={song.year.toString()} />
              <PropertyRow label="Genre" value={song.genre} />
              <PropertyRow label="Track" value={song.trackNumber.toString()} />
              <PropertyRow label="Length" value={song.duration} />
              <PropertyRow label="dev_id" value={song.id} />
            </VStack>
          </ModalBody>

          <ModalFooter pb={0}>
            <Button
              bgGradient="linear(to-r, linear.100, linear.200)"
              // isLoading
              // loadingText={'Submitting'}
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
