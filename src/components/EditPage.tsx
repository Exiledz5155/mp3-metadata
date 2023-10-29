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

export function CardView2() {
  return (
    <Flex
      alignItems="flex-start"
      flexDirection="row"
      p={50}
      w="full"
      justifyContent="center"
      flexWrap="wrap"
    >
      {/* Image */}
      <Card
        bg={useColorModeValue("green.400", "gray.900")}
        padding={"2.5%"}
        borderRadius={"2.5%/6.25%"}
        w={"70%"}
      >
        <Flex alignItems={"center"}>
          <Image
            src="https://m.media-amazon.com/images/I/71NUQhdZDJL._UF1000,1000_QL80_.jpg"
            alt="Sample Image"
            boxSize="300px"
            objectFit="cover"

          />

          <Box overflow={"hidden"} display="flex" justifyContent="center" flexDirection="column">
            <Text ml={5} mb={5} as="b" fontSize="3xl">
              Song Title
            </Text>

            <Text
              ml={5}
              color={useColorModeValue("gray.900", "green.400")}
              as="b"
              mb={5}
              fontSize="xl"
            >
              Artist
            </Text>

            <Text ml={5} mb={5} fontSize="xl">
              Album Title
            </Text>

            <Text ml={5} mb={5} fontSize="xl">
              Year
            </Text>

            <Text ml={5} mb={5} fontSize="xl">
              Genre
            </Text>

            <Text ml={5} mb={5} fontSize="xl">
              Track #
            </Text>
          </Box>
        </Flex>
      </Card>
      
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
    </Flex>
  );
}
