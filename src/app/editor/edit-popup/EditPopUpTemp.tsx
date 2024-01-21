"use client";

import {
  Flex,
  Stack,
  Button,
  Card,
  useColorModeValue,
  Image,
  Text,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { UploadForm } from "../../../components/UploadForm";

export default function editPopUp() {
  return (
    //glex outside is for the center
    <Flex w={"200%"} justifyContent={"center"} alignItems={"center"}>
      <Card
        bg={useColorModeValue("FFFFFF", "gray.900")}
        padding={"2.5%"}
        borderRadius={"2.5%/6.25%"}
        w={"50%"}
      >
        {/* row flex */}
        <Flex flexDirection={"row"}>
          {/* 1'st column flex with image */}
          <Flex flexDirection={"column"}>
            <Text mb={"1em"} as={"b"} fontSize={"xl"}>
              {" "}
              Edit{" "}
            </Text>
            <Image
              src="https://i1.sndcdn.com/artworks-000168416914-fnqzbz-t500x500.jpg"
              alt="Sample Image"
              boxSize="200px"
              objectFit="cover"
            />

            <FormControl mt={"1em"} mb={"1em"}>
              <FormLabel>Year</FormLabel>
              <Input type="text" name="Year" placeholder="Enter Year" />
            </FormControl>

            <FormControl mb={"1em"}>
              <FormLabel>Genre</FormLabel>
              <Input type="text" name="genre" placeholder="Enter Genre" />
            </FormControl>

            <FormControl mb={"1em"}>
              <FormLabel>Track</FormLabel>
              <Input type="text" name="Track" placeholder="Enter Track" />
            </FormControl>
          </Flex>
          {/* 2nd flex with rest of form inputs */}
          <Flex flexDirection={"column"}>
            <FormControl ml={"3em"} mt={"2.75em"} mb={"1em"}>
              <FormLabel>Song Title</FormLabel>
              <Input type="text" name="Title" placeholder="Enter Song Title" />
            </FormControl>

            <FormControl ml={"3em"} mt={"1em"} mb={"1em"}>
              <FormLabel>Artist(s)</FormLabel>
              <Input type="text" name="atist" placeholder="Enter Artist(s)" />
            </FormControl>

            <FormControl ml={"3em"} mt={"1em"} mb={"1em"}>
              <FormLabel>Album Title</FormLabel>
              <Input
                type="text"
                name="album title"
                placeholder="Enter Album Title"
              />
            </FormControl>

            <FormControl ml={"3em"} mt={"1em"} mb={"1em"}>
              <FormLabel>Album Artist(s)</FormLabel>
              <Input
                type="text"
                name="Album Artist"
                placeholder="Enter Album Artist(s)"
              />
            </FormControl>

            <Stack
              ml={"3em"}
              mt={"1.9em"}
              align={"center"}
              spacing={"6em"}
              direction={"row"}
            >
              <Button
                leftIcon={<CheckIcon />}
                colorScheme="blue"
                // isLoading
                // loadingText={'Submitting'}
                size="md"
                variant="solid"
              >
                Save
              </Button>
              <Button
                leftIcon={<CloseIcon />}
                colorScheme="blue"
                size="md"
                variant="outline"
              >
                Cancel
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
