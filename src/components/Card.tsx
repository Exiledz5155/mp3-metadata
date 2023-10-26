import { Box, chakra, Flex, FormControl, FormLabel, Input, Link, Button, ButtonGroup, FormHelperText, FormErrorMessage, Wrap , Card, CardHeader, CardBody, CardFooter, Spacer} from "@chakra-ui/react"
import { useState } from "react"





export function CardView(){

  

    return(  //wrap a box within the flex 
        <Flex
        //bg="#edf3f8"  makes background gray if want
        _dark={{
          bg: "#3e3e3e",
        }}
        p={50}
        w="full"
        alignItems="flex-start"
        justifyContent="center"
        flexWrap="wrap"
        flex-direction="row"
      >
        <Box        //box containing everything image and input types
          bg="white"
          _dark={{bg: "gray.800",}}
          mx={{lg: 8,}}
          display={{lg: "flex",}}
          w={{lg: "5xl",}}
          shadow={{lg: "lg",}}
          rounded={{lg: "lg",}}
        >
          <Box //box containing box of image
            w={{lg: "50%",}}
          >
            <Box   //box containing image
              h={{base: 64,lg: "full",}}
              rounded={{lg: "lg",}}
              bgSize="cover"
              style={{backgroundImage:"url('https://m.media-amazon.com/images/I/71NUQhdZDJL._UF1000,1000_QL80_.jpg')", 
              objectFit: "cover"}}
            ></Box>
          </Box>

          
          <Box    //box containing input types
            py={12}
            px={6}
            maxW={{base: "xl",
              lg: "5xl",}}
            w={{lg: "50%",}}
            mt={3}
          >
            <FormControl mt={3}>
            <FormLabel>Song Title</FormLabel>
            <Input type='text' />
            </FormControl>


            <FormLabel>Album Title</FormLabel>
            <Input type='text' />


            <FormLabel>Album Artist</FormLabel>
            <Input type='text' />


            <FormLabel>Artist(s)</FormLabel>
            <Input type='text' />


            <FormLabel>Year</FormLabel>
            <Input type='text' />


            <FormLabel>Genre</FormLabel>
            <Input type='text' />


            <FormLabel>Track #</FormLabel>
            <Input type='text' />

          </Box>

           <Box display='flex' alignItems='flex-end' justifyContent="center">
          <Button colorScheme='blue'>Save</Button>
          </Box>

          

        </Box>

        {/* //box that contaings the editable fields outside of the big box containg everything else */}
        <Spacer />
        <Card direction={{ base: 'row', sm: 'row' }}
  overflow='hidden'
  variant='outline'>
    
        <Box display='flex' justifyContent="center" alignItems="flex-start" 
        >  

          
        <FormControl>

          <FormLabel>Song Title</FormLabel>
          <Input type='Song Title' />
          <FormHelperText>Edit your title.</FormHelperText>

          <FormLabel>Album Title</FormLabel>
          <Input type='Song Title' />
          <FormHelperText>Edit your album title.</FormHelperText>

          <FormLabel>Artist</FormLabel>
          <Input type='Song Title' />
          <FormHelperText>Edit the artist.</FormHelperText>

          <FormLabel>Year</FormLabel>
          <Input type='Song Title' />
          <FormHelperText>Edit the release year.</FormHelperText>

          <FormLabel>Genre</FormLabel>
          <Input type='Song Title' />
          <FormHelperText>Edit the genre.</FormHelperText>

          <FormLabel>track #</FormLabel>
          <Input type='Song Title' />
          <FormHelperText>Edit the #.</FormHelperText>

          
        </FormControl>
              
      </Box>
      </Card>
      
      </Flex>

  
      
      
      
    )
}