// imageDisplay.js
import React, { useState } from "react";
import {
  Center,
  Grid,
  GridItem,
  Image,
  Icon,
  Box,
  Input,
} from "@chakra-ui/react";
import { MdOutlineQueueMusic } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import {
  Album,
  Song,
  CommonSongProperties,
  HoverableImageProps,
} from "../types/types";

export function renderImageFromAlbumLarge(album, commonProperties) {
  // Map over the songs in the album, add all the unique URLs to a set
  const imagesSet = new Set(
    album.songs
      .map((song) => song.image)
      .filter((image): image is string => typeof image === "string")
  );
  const images = Array.from(imagesSet) as string[];

  if (images.length === 0) {
    return (
      <Center w="200px" h="200px" bg={"brand.200"}>
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

  if (images.length < 4 || commonProperties.image !== "Various") {
    return (
      <Image
        maxW={{ base: "100%", sm: "200px" }}
        src={images[0]}
        alt="Album Cover"
        mr={"20px"}
        borderRadius={"10px"}
      />
    );
  }

  return (
    <Grid
      templateColumns="repeat(2, 1fr)"
      templateRows="repeat(2, 1fr)"
      gap={1}
      maxW={{ base: "100%", sm: "200px" }}
      mr={"20px"}
    >
      {images.slice(0, 4).map((image, index) => (
        <GridItem key={index}>
          <Image
            src={image}
            alt={`Album Cover ${index + 1}`}
            objectFit="cover"
            borderRadius="5px"
            boxSize="100%"
          />
        </GridItem>
      ))}
    </Grid>
  );
}

export function renderImageFromAlbumSmall(album, commonProperties) {
  // Map over the songs in the album, add all the unique URLs to a set
  const imagesSet = new Set(
    album.songs
      .map((song) => song.image)
      .filter((image): image is string => typeof image === "string")
  );
  const images = Array.from(imagesSet) as string[]; // Convert set to array

  if (images.length === 0) {
    return (
      <Center w="55px" h="55px" bg={"brand.200"}>
        <Icon
          as={MdOutlineQueueMusic}
          w={10}
          h={10}
          color="brand.400"
          bg={"brand.200"}
          borderRadius={"5px"}
        />
      </Center>
    );
  }

  if (images.length < 4 || commonProperties.image !== "Various") {
    return (
      <Center w="55px" h="55px">
        <Image
          src={images[0]}
          alt={"Album Image Cover"}
          borderRadius="base"
          boxSize="45px"
        />
      </Center>
    );
  }

  return (
    <Center w="55px" h="55px" p={"5px"}>
      <Grid
        templateColumns="repeat(2, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={0.5}
      >
        {images.slice(0, 4).map((image, index) => (
          <GridItem key={index}>
            <Image
              src={image}
              alt={`Album Image Cover ${index + 1}`}
              objectFit="cover"
              borderRadius="sm"
              boxSize="100%"
            />
          </GridItem>
        ))}
      </Grid>
    </Center>
  );
}

export function renderImageFromSongEdit(songs, commonProperties, isHover) {
  const imagesSet = new Set(
    songs
      .map((song) => song.image)
      .filter((image): image is string => typeof image === "string")
  );
  const images = Array.from(imagesSet) as string[];

  if (!songs || songs.length === 0) {
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

  if (images.length < 4 || commonProperties.image !== "Various") {
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
}

export function HoverableImage({
  songs,
  onFileChange,
  fileInputRef,
  commonProperties,
  selectedFile,
}: HoverableImageProps) {
  const [isHover, setIsHover] = useState(false);

  const renderImageDisplay = () => {
    const imagesSet = new Set(
      songs.map((song) => song.image).filter((image) => image)
    );

    const images = Array.from(imagesSet);

    const imagePreviewUrl = selectedFile
      ? URL.createObjectURL(selectedFile)
      : null;

    if (imagePreviewUrl) {
      return (
        <Image
          src={imagePreviewUrl}
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

    if (images.length < 4 || commonProperties.image !== "Various") {
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
