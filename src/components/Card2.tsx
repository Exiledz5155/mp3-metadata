import { Flex, Box, Image, FormControl, FormLabel, Input, Textarea, Button, Card } from "@chakra-ui/react";


export function CardView2(){
        

        
        
  return (
    <Flex alignItems="flex-start" flexDirection="row" p={50}
    w="full"
    justifyContent="center"
    flexWrap="wrap"
    >
      {/* Image */}
      <Card>
        
      <Box bg="#D3D3D3" mb={4} >
        <Flex justifyContent="center">
        <Image
          src="https://m.media-amazon.com/images/I/71NUQhdZDJL._UF1000,1000_QL80_.jpg"
          alt="Sample Image"
          boxSize="50%"
          objectFit="cover"
        />
        </Flex>
      </Box>
      

      {/* Editable Text in a Column View */}
      <Box mb={1}>
        <FormControl>
          <FormLabel>Song Title</FormLabel>
          <Input type="text" placeholder="Enter song title" />
        </FormControl>

        <FormControl>
          <FormLabel>Album Title</FormLabel>
          <Input type="text" placeholder="Enter album title" />
        </FormControl>

        <FormControl>
          <FormLabel>Artist</FormLabel>
          <Input type="text" placeholder="Enter artist name" />
        </FormControl>

        <FormControl>
          <FormLabel>Year</FormLabel>
          <Input type="text" placeholder="Enter year made" />
        </FormControl>

        <FormControl>
          <FormLabel>Genre</FormLabel>
          <Input type="text" placeholder="Enter genre" />
        </FormControl>


      </Box>
      </Card>

      {/* Row of Editable Elements */}
      <Flex justifyContent="center">
        <FormControl mt={3} mr={4}>
          <FormLabel>Song Title</FormLabel>
          <Input type="text" placeholder="Edit Title" />
        </FormControl>

        <FormControl mt={3} mr={4}>
          <FormLabel>Album Title</FormLabel>
          <Input type="text" placeholder="Edit Album Title" />
        </FormControl>

        <FormControl mt={3} mr={4}>
          <FormLabel>Artist(s)</FormLabel>
          <Input type="text" placeholder="Edit the Artist(s)" />
        </FormControl>

        <FormControl mt={3} mr={4}>
          <FormLabel>Year</FormLabel>
          <Input type="text" placeholder="Edit the Year" />
        </FormControl>

        <FormControl mt={3} mr={4}>
          <FormLabel>Genre</FormLabel>
          <Input type="text" placeholder="Edit the Genre" />
        </FormControl>

        <FormControl mt={3}>
          <FormLabel>Track #</FormLabel>
          <Input type="text" placeholder="Edit track number" />
        </FormControl>
      </Flex>

      {/* Save Button */}
      <Button mt={4} colorScheme="blue">
        Save
      </Button>
    </Flex>
  );
};



        
        
    