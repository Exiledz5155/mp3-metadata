import { CheckIcon, Icon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  Box,
  VStack,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";

interface PropertiesComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Song {
  trackNumber: number;
  id: string;
  title: string;
  duration: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  image: string;
}

export const Properties: React.FC<PropertiesComponentProps> = ({
  song,
  isOpen,
  onClose,
}: {
  song: Song;
  isOpen: boolean;
  onClose: () => void;
}) => {
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
};

export default Properties;
