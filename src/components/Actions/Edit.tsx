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
import { UploadIMG } from "../FileHub/FileHub-Upload/UploadFiles";
import { useUUID } from "../../contexts/UUIDContext";

interface EditComponentProps {
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

export default function Edit({ song, isOpen, onClose }: EditComponentProps) {
  const { uuid, generateUUID } = useUUID();
  // Track if image is hovered or not
  const [isHovering, setIsHovering] = useState(false);

  // TODO: Make this upload actually go to correct blob container
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      console.log(file);
    }
  };

  const handleUpload = async () => {
    let fileName = file.name.toLowerCase();

    const endsWithPNG = fileName.endsWith("png");

    const endsWithJPG = /\.(jpg|jpeg)$/.test(fileName);

    if (endsWithPNG || endsWithJPG) {
      fileName = file.name;
      const mockID = 1;
      try {
        const response = await UploadIMG(file, uuid, mockID);
        if (response.ok) {
          console.log("IMG uploaded successfully");
        } else {
          console.error("Failed to upload IMG");
        }
      } catch (error) {
        console.error("Failed to upload IMG file:", error);
      }
    } else {
      console.error(
        `Error: File ${file.name} is not an image file of type PNG or JPG.`
      );
    }
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
                <Box
                  position="relative"
                  height="100%"
                  width="100%"
                  cursor="pointer"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                  onClick={() => fileInputRef.current?.click()}
                  transition="background-color 0.2s ease"
                >
                  <Image
                    src="https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
                    alt="Album Cover"
                    borderRadius={"5px"}
                    fit="cover"
                    boxSize="100%"
                    _hover={{ opacity: "50%" }}
                  />
                  <Icon
                    as={IoCloudUploadOutline}
                    boxSize="24px"
                    color="white"
                    position="absolute"
                    left="50%"
                    top="50%"
                    transform="translate(-50%, -50%)"
                    visibility={isHovering ? "visible" : "hidden"}
                    transition={"visibility 0.2s ease"}
                  />
                </Box>
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

          <ModalFooter>
            <Button
              leftIcon={<CheckIcon />}
              bgGradient="linear(to-r, linear.100, linear.200)"
              // isLoading
              // loadingText={'Submitting'}
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
