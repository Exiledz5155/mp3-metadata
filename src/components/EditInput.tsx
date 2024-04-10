import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";

export function EditInput() {
  return (
    <>
      <Flex flexDirection={"column"}>
        <FormControl mt={"3em"} mb={"12%"}>
          <FormLabel>Song Title</FormLabel>
          <Input type="text" name="Title" placeholder="Enter Song Title" />
        </FormControl>

        <FormControl mb={"12%"}>
          <FormLabel>Artist(s)</FormLabel>
          <Input type="text" name="atist" placeholder="Enter Artist(s)" />
        </FormControl>

        <FormControl mb={"12%"}>
          <FormLabel>Album Title</FormLabel>
          <Input
            type="text"
            name="album title"
            placeholder="Enter Album Title"
          />
        </FormControl>

        <FormControl mb={"10%"}>
          <FormLabel>Album Artist(s)</FormLabel>
          <Input
            type="text"
            name="Album Artist"
            placeholder="Enter Album Artist(s)"
          />
        </FormControl>

        <Stack mt={"10%"} align={"center"} spacing={"2em"} direction={"row"}>
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
    </>
  );
}
