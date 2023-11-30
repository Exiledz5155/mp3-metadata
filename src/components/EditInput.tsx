import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { Flex, FormControl, FormLabel, Input, Stack, Button } from "@chakra-ui/react";


export function EditInput(){

    return (
        <>
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
      </>
    );
}