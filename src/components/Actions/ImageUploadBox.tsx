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
} from "@chakra-ui/react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { UploadIMG } from "../FileHub/FileHub-Upload/UploadFiles";
import { useUUID } from "../../contexts/UUIDContext";
import { CheckIcon } from "@chakra-ui/icons";

function HoverableImage({ src, alt, onClick }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
      onClick={onClick} // Make sure this is calling the correct function
      cursor="pointer"
    >
      <Box
        position="relative"
        height="100%"
        width="100%"
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <Image
          src={src}
          alt={alt}
          objectFit="cover"
          borderRadius="5px"
          fit="cover"
          boxSize="100%"
          transition="opacity 0.3s ease-in-out"
          style={{ opacity: isHover ? 0.3 : 1 }}
        />
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
      </Box>
    </Box>
  );
}

interface IUBComponentProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song;
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

export default function ImageUploadBox({
  song,
  isOpen,
  onClose,
}: IUBComponentProps) {
  const [imageSrc, setImageSrc] = useState(
    "https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
  ); // update with song.image
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();
  const { uuid } = useUUID();

  const handleFileClick = () => {
    fileInputRef.current?.click(); // Ensure this is correctly referencing the input
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (!/\.(jpg|jpeg)$/i.test(file.name)) {
        toast({
          title: "Error",
          description: "File is not a JPG image.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }
      const fileUrl = URL.createObjectURL(file); // Create a URL for the file
      setImageSrc(fileUrl); // Update the image src state
      setSelectedFile(file);
    }
  };

  useEffect(() => {
    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc); // Cleanup the object URL
      }
    };
  }, [imageSrc]);

  const handleSave = async () => {
    const songID = 1; // TEMP REMOVE LATER
    if (selectedFile) {
      try {
        const response = await UploadIMG(selectedFile, uuid, songID); // Assuming song.id is available
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
      <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
        accept=".jpg,.jpeg"
      />
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
              src={imageSrc}
              alt="Descriptive Alt Text"
              onClick={handleFileClick}
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
