// app/providers.tsx
"use client";

import {
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export function EditForm() {
  return (
    <Container margin={"0"}>
      {/* Editable Text in a Column View */}
      <Flex flexGrow={1} flexDirection={"column"}>
        <FormControl mt={"1em"} mb={"1em"}>
          <FormLabel>Song Title</FormLabel>
          <Input type="text" placeholder="Enter song title" />
        </FormControl>

        <FormControl mb={"1em"}>
          <FormLabel>Album Title</FormLabel>
          <Input type="text" placeholder="Enter album title" />
        </FormControl>

        <FormControl mb={"1em"}>
          <FormLabel>Artist</FormLabel>
          <Input type="text" placeholder="Enter artist name" />
        </FormControl>

        <FormControl mb={"1em"}>
          <FormLabel>Year</FormLabel>
          <Input type="text" placeholder="Enter year made" />
        </FormControl>

        <FormControl mb={".5em"}>
          <FormLabel>Genre</FormLabel>
          <Input type="text" placeholder="Enter genre" />
        </FormControl>

        {/* Save Button */}
        <Button mt={4} colorScheme="blue">
          Save
        </Button>
      </Flex>
    </Container>
  );
}
