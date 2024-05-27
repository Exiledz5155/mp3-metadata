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
import React, { useEffect, useRef, useState } from "react";
import { Album, Song, CommonSongProperties } from "../../types/types";
import { calculateCommonProperties } from "../../util/commonprops";
import { convertTime } from "../../util/duration";
import { calculateTotalDuration } from "../../util/duration";

interface PropertiesComponentProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Song[];
}

export default function Properties({
  songs,
  isOpen,
  onClose,
}: PropertiesComponentProps) {
  const [commonProperties, setCommonProperties] =
    useState<CommonSongProperties>(calculateCommonProperties(songs));

  useEffect(() => {
    setCommonProperties(calculateCommonProperties(songs));
  }, [songs]);

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
              <PropertyRow
                label="Album"
                value={commonProperties.albumTitle || ""}
              />
              <PropertyRow
                label="Album Artist(s)"
                value={commonProperties.albumArtist || ""}
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
                value={calculateTotalDuration(songs) || ""}
              />
              <PropertyRow label="dev_id" value={commonProperties.id || ""} />
            </VStack>
          </ModalBody>

          <ModalFooter pb={0}>
            <Button
              bgGradient={"linear(to-r, linear.100, linear.200)"}
              _hover={{
                color: "white",
                bg: "brand.300",
                transition: "all 0.3s ease-in-out",
              }}
              color={"brand.100"}
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
