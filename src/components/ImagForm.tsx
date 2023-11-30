import { Flex, FormControl, FormLabel, Input, Text,Image } from "@chakra-ui/react";

export function ImagForm() {
  return (
    <>
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
    </>
  );
}
