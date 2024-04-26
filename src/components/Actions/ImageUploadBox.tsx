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
import { Album, CommonSongProperties, Song } from "../../types/types";
import { calculateCommonProperties } from "../../util/commonprops";
import { useFetch } from "../../contexts/FetchContext";
import { HoverableImage } from "../../util/generateimage";

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
  const { refetchData } = useFetch();
  const [commonProperties, setCommonProperties] =
    useState<CommonSongProperties>(calculateCommonProperties(songs));

  useEffect(() => {
    setCommonProperties(calculateCommonProperties(songs));
  }, [songs]);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { uuid } = useUUID();

  const handleClose = () => {
    setSelectedFile(null); // reset selected file on modal close
    onClose();
  };

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
          refetchData();
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
        onClose={handleClose}
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
              commonProperties={commonProperties}
              selectedFile={selectedFile}
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
