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
import { useEffect, useRef, useState } from "react";
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

  const PropertyRow = ({ label, value }) => {
    const textRef = useRef<HTMLDivElement>(null);
    const [isTruncated, setIsTruncated] = useState(false);

    useEffect(() => {
      const element = textRef.current;
      if (element) {
        const isOverflowing =
          element.scrollWidth > element.clientWidth ||
          element.scrollHeight > element.clientHeight;
        setIsTruncated(isOverflowing);
      }
    }, [value]);

    return (
      <HStack justifyContent="space-between">
        <Text fontWeight="semibold">{label}</Text>
        {isTruncated ? (
          <Tooltip
            label={value}
            placement="right"
            bg={"brand.300"}
            color={"white"}
            borderRadius={5}
            p={2}
            hasArrow
          >
            <Text ref={textRef} noOfLines={1} maxW={"70%"}>
              {value}
            </Text>
          </Tooltip>
        ) : (
          <Text ref={textRef} noOfLines={1} maxW={"70%"}>
            {value}
          </Text>
        )}
      </HStack>
    );
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xl"
      >
        <ModalOverlay />
        <ModalContent bg={"brand.200"} py={25} borderRadius={"xl"}>
          <ModalHeader pt={0}>Properties</ModalHeader>
          <ModalCloseButton mr={3} mt={3} />
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
