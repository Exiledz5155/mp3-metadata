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
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useUUID } from "../../contexts/UUIDContext";
import ImageUploadBox from "./ImageUploadBox";
import { Album, Song } from "../../types/types";

interface EditComponentProps {
  isOpen: boolean;
  onClose: () => void;
  song: Song;
}

// REFACTOR, THIS IS DIFFERENT FROM IMAGEUPLOADBOX
function HoverableImage({ src, alt, onOpen }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <Box
      position="relative"
      height="100%"
      width="100%"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onOpen}
      cursor="pointer"
    >
      <Image
        src={src}
        alt={alt}
        objectFit="cover"
        borderRadius={"5px"}
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
  );
}

export default function Edit({ song, isOpen, onClose }: EditComponentProps) {
  const { uuid, generateUUID } = useUUID();

  // TODO: Make this upload actually go to correct blob container
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
    }
  };

  // In your Edit component, manage the ImageUploadBox modal separately
  const [imageUploadBoxOpen, setImageUploadBoxOpen] = useState(false);

  const handleImageUploadBoxClose = () => {
    setImageUploadBoxOpen(false);
    // Do not call onClose here; onClose should only close the Edit modal
  };

  // When you open the ImageUploadBox from within the Edit modal
  const handleOpenImageUploadBox = () => {
    setImageUploadBoxOpen(true);
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
        <ModalContent bg={"brand.200"} pb={25} borderRadius={"xl"}>
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Grid
              h="sm"
              templateRows="repeat(30, 1fr)"
              templateColumns="repeat(34, 1fr)"
              gap={4}
            >
              <GridItem rowSpan={12} colSpan={12} position="relative">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  hidden
                  ref={fileInputRef}
                />
                <HoverableImage
                  src={song.image}
                  alt="Cover Art"
                  onOpen={handleOpenImageUploadBox}
                />
                <ImageUploadBox
                  song={song}
                  isOpen={imageUploadBoxOpen}
                  onClose={handleImageUploadBoxClose}
                ></ImageUploadBox>
              </GridItem>

              {/*TODO: Change on focus color for input */}
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Song Title</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={song.title}
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Artist(s)</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={song.artist}
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Year</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={song.year.toString()}
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Album Title</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={song.album}
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Genre</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={song.genre}
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Album Artist(s)</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={song.artist} // NEEDS TO BE CHANGED TO ALBUM ARTIST
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Track</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={song.trackNumber.toString()}
                  />
                </FormControl>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter pb={0} pt={6}>
            <Button
              leftIcon={<CheckIcon />}
              bgGradient="linear(to-r, linear.100, linear.200)"
              // isLoading
              // loadingText={'Submitting'}
              w={"63.5%"}
              size="md"
              variant="solid"
              onClick={onClose}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
