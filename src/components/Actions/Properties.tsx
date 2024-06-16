"use client";

import {
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CommonSongProperties, Song } from "../../types/types";
import { calculateCommonProperties } from "../../util/commonprops";
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

  const PropertyRow = ({ label, value, hasTooltip }) => (
    <HStack justifyContent="space-between">
      <Text fontWeight="semibold">{label}</Text>
      {hasTooltip ? (
        <Tooltip
          label={value}
          placement="right"
          bg={"brand.300"}
          color={"white"}
          borderRadius={5}
          p={2}
          hasArrow
        >
          <Text noOfLines={1} maxW={"70%"}>
            {value}
          </Text>
        </Tooltip>
      ) : (
        <Text noOfLines={1} maxW={"70%"}>
          {value}
        </Text>
      )}
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
              <PropertyRow
                label="Title"
                value={commonProperties.title || ""}
                hasTooltip={true}
              />
              <PropertyRow
                label="Artist(s)"
                value={commonProperties.artist || ""}
                hasTooltip={true}
              />
              <PropertyRow
                label="Album"
                value={commonProperties.albumTitle || ""}
                hasTooltip={true}
              />
              <PropertyRow
                label="Album Artist(s)"
                value={commonProperties.albumArtist || ""}
                hasTooltip={true}
              />
              <PropertyRow
                label="Year"
                value={commonProperties.year?.toString() || ""}
                hasTooltip={false}
              />
              <PropertyRow
                label="Genre"
                value={commonProperties.genre || ""}
                hasTooltip={false}
              />
              <PropertyRow
                label="Track"
                value={commonProperties.trackNumber?.toString() || ""}
                hasTooltip={false}
              />
              <PropertyRow
                label="Length"
                value={calculateTotalDuration(songs) || ""}
                hasTooltip={false}
              />
              <PropertyRow
                label="dev_id"
                value={commonProperties.id || ""}
                hasTooltip={false}
              />
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
