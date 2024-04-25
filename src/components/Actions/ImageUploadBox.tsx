import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Image,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useToast,
  Flex,
  Input,
  Center,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdOutlineQueueMusic } from "react-icons/md";
import { UploadIMG } from "../../util/UploadFiles";
import { useUUID } from "../../contexts/UUIDContext";
import { CheckIcon } from "@chakra-ui/icons";
import { Album, Song } from "../../types/types";

interface HoverableImageProps {
  songs: Song[];
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
}

function HoverableImage({
  songs,
  onFileChange,
  fileInputRef,
}: HoverableImageProps) {
  const [isHover, setIsHover] = useState(false);

  const renderImageDisplay = () => {
    const images = songs.map((song) => song.image).filter((image) => image);

    if (images.length === 0) {
      return (
        <Center height="100%" bg={"brand.200"}>
          <Icon
            as={MdOutlineQueueMusic}
            w={20}
            h={20}
            color="brand.400"
            bg={"brand.200"}
            borderRadius={"5px"}
          />
        </Center>
      );
    }

    if (images.length < 4) {
      return (
        <Image
          src={images[0]}
          alt="Song Image"
          objectFit="cover"
          borderRadius="5px"
          fit="cover"
          boxSize="100%"
          transition="opacity 0.3s ease-in-out"
          style={{ opacity: isHover ? 0.3 : 1 }}
        />
      );
    }

    return (
      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={1}
        height="100%"
      >
        {images.slice(0, 4).map((image, index) => (
          <GridItem key={index}>
            <Image
              src={image}
              alt={`Song Image ${index + 1}`}
              objectFit="cover"
              borderRadius="5px"
              fit="cover"
              boxSize="100%"
              transition="opacity 0.3s ease-in-out"
              style={{ opacity: isHover ? 0.3 : 1 }}
            />
          </GridItem>
        ))}
      </Grid>
    );
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      onClick={() => fileInputRef.current?.click()}
      cursor="pointer"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {renderImageDisplay()}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        style={{ opacity: isHover ? 1 : 0 }}
        transition="opacity 0.3s ease-in-out"
      >
        <Icon as={IoCloudUploadOutline} w={8} h={8} color="white" />
      </Box>
      <Input
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        style={{ display: "none" }}
        accept=".jpg,.jpeg,.png"
      />
    </Box>
  );
}

interface IUBComponentProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Song[];
}

export default function ImageUploadBox({
  songs,
  isOpen,
  onClose,
}: IUBComponentProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { uuid } = useUUID();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!/\.(png|jpe?g)$/i.test(file.name)) {
        toast({
          title: "Error",
          description: "File is not a PNG or JPG.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      setSelectedFile(file);
    }
  };

  const handleSave = async () => {
    if (selectedFile) {
      try {
        const songIDs = songs.map((song) => parseInt(song.id, 10));
        const response = await UploadIMG(selectedFile, uuid, songIDs);
        if (response.ok) {
          toast({
            title: "Success",
            description: "Image uploaded successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          onClose(); // Close the modal after successful upload
        } else {
          throw new Error("Failed to upload image.");
        }
      } catch (error) {
        toast({
          title: "Upload Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "No File",
        description: "No file has been selected.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
        size="xs"
      >
        <ModalOverlay />
        <ModalContent bg={"brand.200"} pb={25} borderRadius={"xl"}>
          <ModalHeader>Edit Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <HoverableImage
              songs={songs}
              onFileChange={handleFileChange}
              fileInputRef={fileInputRef}
            />
          </ModalBody>
          <ModalFooter>
            <Flex width="100%" justifyContent="space-between">
              <Button
                bg="#F7FAFC"
                color={"black"}
                _hover={{ color: "white", bg: "brand.300" }}
                size="md"
                variant="solid"
                onClick={onClose}
                w="48%"
              >
                Close
              </Button>
              <Button
                leftIcon={<CheckIcon />}
                bgGradient="linear(to-r, linear.100, linear.200)"
                size="md"
                variant="solid"
                onClick={handleSave}
                w="48%"
              >
                Save
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
