import React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
  Icon,
  Box,
  Text,
  Progress,
  VStack,
  useColorModeValue
} from "@chakra-ui/react";
import { MdOutlineFilePresent } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { 
  FiFileText,
  FiRotateCcw } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";

interface UploadBoxProps {
  isOpen: boolean; // Whether the modal is open or not
  onClose: () => void; // Function to close the modal
}
export const FileUploadBox: React.FC<UploadBoxProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Modal component */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent bg={"brand.200"} pb={25} borderRadius={"xl"} width={["100%", "50%"]}>
          {/* Modal header */}
          <ModalHeader>
            <Flex alignItems="center">
              <Icon as={MdOutlineFilePresent} boxSize={8} />
              <Box fontSize="2xl" ml={2}>Upload Files</Box>
            </Flex>
          </ModalHeader>
          <ModalBody>
            {/* File upload box */}
            <Box border="2px dashed" p={4} borderRadius="2xl">
              <Flex direction="column" justifyContent="center" alignItems="center">
                <Icon as={IoCloudUploadOutline} boxSize={12} mb={2} />
                <Text fontWeight="bold">Drag and drop files here</Text>
                <Text color="#8E95A3">or</Text>
                <Button
                  as="label"
                  htmlFor="fileInput"
                  variant="outline"
                  mt={2}
                  bg="#A0AEC0"
                  color="#1A202C"
                  _hover={{ cursor: 'pointer' }}
                >
                  Browse Files
                  <Input type="file" id="fileInput" style={{ display: "none" }} />
                </Button>
              </Flex>
            </Box>
            <Text color="#8E95A3" mt={3} mb={6}>Only .mp3 files. Max size 30mb.</Text>
            
            {/* File list */}
            <ModalHeader pl={0}>
              <Box fontSize="l">Upload Files</Box>
            </ModalHeader>
            <Box 
              mb={5}
              overflowY="auto" 
              maxHeight="275px"
              paddingRight="10px"
              css={{
                '&::-webkit-scrollbar': {
                  width: '5px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#888',
                  borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#555',
                },
              }}
            >
              {/* File item */}
              <Box border="2px" mb={4} p={4} borderRadius="2xl">
                <Flex align="center">
                  <Icon as={FiFileText} boxSize={6} />
                  <Flex flex={1} pl={6} direction="column"> {/* Change this line */}
                    <Text mb="-1" textAlign="left">PRIDE. - Kendrick Lamar.mp3</Text>
                    <Text fontSize="xs" mb="-2" textAlign="left" color="#8E95A3">7.8mb | 72%</Text> 
                  </Flex>
                  <Icon as={BsFillTrashFill} boxSize={6} /> 
                </Flex>
                <Progress mt={4} value={72} size="sm" colorScheme="linear" borderRadius="md"/>
              </Box>

              {/* File item */}
              <Box border="2px" mb={4} p={4} borderRadius="2xl">
                <Flex align="center">
                  <Icon as={FiFileText} boxSize={6} />
                  <Flex flex={1} pl={6} direction="column"> {/* Change this line */}
                    <Text mb="-1" textAlign="left">Show Me How - Men I Trust.mp3</Text>
                    <Text fontSize="xs" textAlign="left" color="#FF7074">Upload Failed</Text> 
                  </Flex>
                  <Icon as={BsFillTrashFill} boxSize={6} mr={5} /> 
                  <Icon as={FiRotateCcw} boxSize={6} /> 
                </Flex>
              </Box>

              {/* File item */}
              <Box border="2px" mb={4} p={4} borderRadius="2xl">
                <Flex align="center">
                  <Icon as={FiFileText} boxSize={6} />
                  <Flex flex={1} pl={6} direction="column"> {/* Change this line */}
                    <Text mb="-1" textAlign="left">No More Parties In LA - Kanye West.mp3</Text>
                    <Text fontSize="xs" textAlign="left" color="#8E95A3">14.8mb</Text> 
                  </Flex>
                  <Icon as={BsFillTrashFill} boxSize={6} /> 
                </Flex>
              </Box>
              <Box border="2px" mb={4} p={4} borderRadius="2xl">
                <Flex align="center">
                  <Icon as={FiFileText} boxSize={6} />
                  <Flex flex={1} pl={6} direction="column"> {/* Change this line */}
                    <Text mb="-2" textAlign="left">No More Parties In LA - Kanye West.mp3</Text>
                    <Text fontSize="xs" textAlign="left" color="#8E95A3">14.8mb</Text> 
                  </Flex>
                  <Icon as={BsFillTrashFill} boxSize={6} /> 
                </Flex>
              </Box>
            </Box>
            
            {/* Modal footer */}
            <Flex justifyContent="space-between">
              <Button
                flex="1"
                bg="#F7FAFC"
                color="#1A202C"
                size="lg"
                variant="solid"
                onClick={onClose}
                mr={4}
              >
                Cancel
              </Button>
              <Button
                flex="1"
                bg="#4299E1"
                color="#1A202C"
                size="lg"
                variant="solid"
                onClick={onClose}
              >
                Upload Files
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileUploadBox;
