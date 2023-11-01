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
import { useState, useEffect } from "react";

// THIS IS TEMPLATE CODE FOR STARTING A NEW PAGE
// DO NOT MODIFY OR DELETE - Danny

export function EditForm() {
  const [formData, setFormData] = useState({
    title: "",
    artist: "",
    album: "",
    year: "",
    genre: "", // Might need to be a number
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch("../api/update-metadata", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send formData directly, not inside an object
      });

      if (response.ok) {
        const data = await response.json();
      } else {
        console.error("Failed to send metadata.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  //filepaths
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("../api/filepaths");
        if (response.ok) {
          const result = await response.json();
          setData(result);
        } else {
          console.error("Request failed with status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);
  const filePaths = data;
  console.log("edit page");
  console.log(filePaths);

  return (
    <Container>
      {/* Editable Text in a Column View */}
      <Flex mt={"2em"} flexGrow={1} flexDirection={"column"}>
        <form onSubmit={handleSubmit}>
          <FormControl mb={"1em"}>
            <FormLabel>Song Title</FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter song title"
            />
          </FormControl>

          <FormControl mb={"1em"}>
            <FormLabel>Album Title</FormLabel>
            <Input
              type="text"
              name="album"
              value={formData.album}
              onChange={handleChange}
              placeholder="Enter album title"
            />
          </FormControl>

          <FormControl mb={"1em"}>
            <FormLabel>Artist</FormLabel>
            <Input
              type="text"
              name="artist"
              value={formData.artist}
              onChange={handleChange}
              placeholder="Enter artist name"
            />
          </FormControl>

          <FormControl mb={"1em"}>
            <FormLabel>Year</FormLabel>
            <Input
              type="text"
              name="year"
              value={formData.year}
              onChange={handleChange}
              placeholder="Enter year made"
            />
          </FormControl>

          <FormControl mb={".5em"}>
            <FormLabel>Genre</FormLabel>
            <Input
              type="text"
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              placeholder="Enter genre"
            />
            <Button type="submit" mt={4} colorScheme="blue">
              Save
            </Button>
          </FormControl>
        </form>
      </Flex>
    </Container>
  );
}
