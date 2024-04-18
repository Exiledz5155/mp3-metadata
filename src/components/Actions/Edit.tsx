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
  Center,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useRef } from "react";
import { useState } from "react";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useUUID } from "../../contexts/UUIDContext";
import ImageUploadBox from "./ImageUploadBox";
import { Album, Song } from "../../types/types";
import { MdOutlineQueueMusic } from "react-icons/md";
import axios from "axios";
import { useFetch } from "../../contexts/FetchContext";

interface EditComponentProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Song[];
}

// maybe export this
interface CommonSongProperties {
  title: string;
  artist: string;
  album: string;
  year: string;
  genre: string;
  albumArtist: string;
  trackNumber: string;
  image: string;
}

interface MetadataProps {
  title: string;
  artist: string;
  album: string;
  year: number;
  genre: string;
  albumArtist: string;
  trackNumber: number;
}

// REFACTOR, THIS IS DIFFERENT FROM IMAGEUPLOADBOX
function HoverableImage({ src, alt, onOpen }) {
  const [isHover, setIsHover] = useState(false);
  const showPlaceholder = !src || src === "Various";

  return (
    <Box
      position="relative"
      height="100%"
      width="100%"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={onOpen}
      cursor="pointer"
      backgroundColor={showPlaceholder ? "gray.200" : "transparent"}
      borderRadius={"5px"}
    >
      {!showPlaceholder ? (
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
      ) : (
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
      )}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        style={{ opacity: isHover ? 1 : 0 }}
        transition="opacity 0.3s ease-in-out"
        borderRadius={"5px"}
      >
        <Icon as={IoCloudUploadOutline} w={8} h={8} color="white" />
      </Box>
    </Box>
  );
}

export default function Edit({ songs, isOpen, onClose }: EditComponentProps) {
  const { refetchData } = useFetch();
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

  // export this or something
  const commonProperties = songs.reduce<CommonSongProperties>(
    (acc, song, index) => {
      if (index === 0) {
        // Initialize with the first song's properties, assuming all songs have the same type of properties
        return {
          title: song.title,
          artist: song.artist,
          album: song.album,
          year: song.year.toString(),
          genre: song.genre,
          albumArtist: song.artist, // Adjust based on your actual data structure
          trackNumber: song.trackNumber.toString(),
          image: song.image,
        };
      } else {
        // Compare and set 'various' if different
        return {
          title: acc.title === song.title ? song.title : "Various",
          artist: acc.artist === song.artist ? song.artist : "Various",
          album: acc.album === song.album ? song.album : "Various",
          year:
            acc.year === song.year.toString()
              ? song.year.toString()
              : "Various",
          genre: acc.genre === song.genre ? song.genre : "Various",
          albumArtist:
            acc.albumArtist === song.artist ? song.artist : "Various",
          trackNumber:
            acc.trackNumber === song.trackNumber.toString()
              ? song.trackNumber.toString()
              : "Various",
          image: acc.image === song.image ? song.image : "Various",
        };
      }
    },
    {
      title: "Various",
      artist: "Various",
      album: "Various",
      year: "Various",
      genre: "Various",
      albumArtist: "Various",
      trackNumber: "Various",
      image: "Various",
    }
  );

  const multipleSongsSelected = songs.length > 1;

  const toast = useToast();
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [albumArtist, setAlbumArtist] = useState("");
  const [trackNumber, setTrackNumber] = useState("");

  const handleSave = async () => {
    if (year && isNaN(Number(year))) {
      toast({
        title: "Validation Error",
        description: "Year must be a number.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (trackNumber && isNaN(Number(trackNumber))) {
      toast({
        title: "Validation Error",
        description: "Track number must be a number.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const metadata = {} as Partial<MetadataProps>;
    if (title) metadata.title = title;
    if (artist) metadata.artist = artist;
    if (album) metadata.album = album;
    if (year) metadata.year = parseInt(year, 10);
    if (genre) metadata.genre = genre;
    if (albumArtist) metadata.albumArtist = albumArtist;
    if (trackNumber) metadata.trackNumber = parseInt(trackNumber, 10);

    const body = {
      uuid: uuid, // Replace with actual session UUID
      ids: songs.map((song) => song.id),
      metadata,
    };

    // Expand this error handling
    try {
      const response = await axios.post("/api/update", body);
      toast({
        title: "Success",
        description: "Metadata updated successfully!",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      refetchData(); // Call back function to reload album data across the app
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update metadata: " + error.message,
        status: "error",
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
        size="xl"
      >
        <ModalOverlay />
        <ModalContent bg={"brand.200"} pb={25} borderRadius={"xl"}>
          <ModalHeader>Edit Song{multipleSongsSelected ? "s" : ""}</ModalHeader>
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
                  src={
                    commonProperties.image !== "Various"
                      ? commonProperties.image
                      : undefined
                  }
                  alt="Cover Art"
                  onOpen={handleOpenImageUploadBox}
                />
                {/* <ImageUploadBox
                  song={song}
                  isOpen={imageUploadBoxOpen}
                  onClose={handleImageUploadBoxClose}
                ></ImageUploadBox> */}
              </GridItem>

              {/*TODO: Change on focus color for input */}
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl isDisabled={multipleSongsSelected}>
                  <FormLabel>Song Title</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={commonProperties.title}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl isDisabled={multipleSongsSelected}>
                  <FormLabel>Artist(s)</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={commonProperties.artist}
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Year</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={commonProperties.year}
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Album Title</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={commonProperties.album}
                    value={album}
                    onChange={(e) => setAlbum(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Genre</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={commonProperties.genre}
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Album Artist(s)</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={commonProperties.albumArtist} // NEEDS TO BE CHANGED TO ALBUM ARTIST
                    // value={albumArtist} onChange={(e) => setAlbumArtist(e.target.value)}
                    // REACTIVATE THIS ONCE NEW TYPES ARE IN
                  />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl isDisabled={multipleSongsSelected}>
                  <FormLabel>Track</FormLabel>
                  <Input
                    focusBorderColor="linear.200"
                    placeholder={commonProperties.trackNumber}
                    value={trackNumber}
                    onChange={(e) => setTrackNumber(e.target.value)}
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
              onClick={handleSave}
            >
              Save
            </Button>
            {/* <Button variant="ghost" onClick={onClose}>Cancel</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
