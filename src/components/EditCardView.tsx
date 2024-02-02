"use client";

import {
  Flex,
  Box,
  Image,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Card,
  Text,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";

function loadFileView(selectFile) {
  if (selectFile !== undefined) {
    try {
      let f = selectFile[0];
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }
}

export function EditCardView({ selectFile }) {
  let f;
  console.log("selectedFile", selectFile)
  try {
    // Galaxy brain bug fix PLEASE DO NOT DELETE THANK
    f = selectFile[0]["title"];
    f = selectFile[0];
  } catch (error) {
    console.error("An error occurred:", error);
    // Provide a default value or take appropriate action
    f = {
      title: "Title Not Available",
      artist: "Artist Not Available",
      album: "Album Not Available",
      year: "Year Not Available",
      genre: "Genre Not Available",
      trackNumber: "Track Number Not Available",
    };
  }

  return (
    <Card
      bg={useColorModeValue("green.400", "gray.900")}
      padding={"2.5%"}
      borderRadius={"2.5%/6.25%"}
      w={"70%"}
    >
      <Flex alignItems={"center"}>
        <Image
          src="https://i1.sndcdn.com/artworks-000168416914-fnqzbz-t500x500.jpg"
          alt="Sample Image"
          boxSize="300px"
          objectFit="cover"
        />

        <Box
          overflow={"hidden"}
          display="flex"
          justifyContent="center"
          flexDirection="column"
        >
          <Text ml={5} mb={5} as="b" fontSize="3xl">
            {f["title"]}
          </Text>

          <Text
            ml={5}
            color={useColorModeValue("gray.900", "green.400")}
            as="b"
            mb={5}
            fontSize="xl"
          >
            {f["artist"]}
          </Text>

          <Text ml={5} mb={5} fontSize="xl">
            {f["album"]}
          </Text>

          <Text ml={5} mb={5} fontSize="l">
            {f["year"]}
          </Text>

          <Text ml={5} mb={5} fontSize="l">
            {f["genre"]}
          </Text>

          <Text ml={5} mb={5} fontSize="l">
            {f["trackNumber"]}
          </Text>
        </Box>
      </Flex>
    </Card>
  );
}
