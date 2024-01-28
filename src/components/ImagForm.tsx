import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  Image,
} from "@chakra-ui/react";

export function ImagForm() {
  return (
    <>
      <Flex flexDirection={"column"} mr={"2em"}>
        <Text mb={"1em"} as={"b"} fontSize={"xl"}>
          {" "}
          Edit{" "}
        </Text>
        <Image
          src="https://i1.sndcdn.com/artworks-000168416914-fnqzbz-t500x500.jpg"
          alt="Sample Image"
          boxSize="192px"
          fit="fill"
        />

        <FormControl mt={"2.75%"} mb={"13.3%"}>
          <FormLabel>Year</FormLabel>
          <Input type="text" name="Year" placeholder="Enter Year" />
        </FormControl>

        <FormControl mb={"9.3%"}>
          <FormLabel>Genre</FormLabel>
          <Input type="text" name="genre" placeholder="Enter Genre" />
        </FormControl>

        <FormControl>
          <FormLabel>Track</FormLabel>
          <Input type="text" name="Track" placeholder="Enter Track" />
        </FormControl>
      </Flex>
    </>
  );
}
