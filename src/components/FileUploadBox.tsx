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
  useColorModeValue,
} from "@chakra-ui/react";
import FileUploadCard from "./FileUploadCard";
import { MdOutlineFilePresent } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { FiFileText, FiRotateCcw } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";

interface UploadBoxProps {
  isOpen: boolean; // Whether the modal is open or not
  onClose: () => void; // Function to close the modal
}
export const FileUploadBox: React.FC<UploadBoxProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <>
      {/* Modal component */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent
          bg={"brand.200"}
          py={25}
          borderRadius={"xl"}
          width={["100%", "60%"]}
        >
          {/* Modal header */}
          <ModalHeader pt={0}>
            <Flex alignItems="center">
              <Icon as={MdOutlineFilePresent} boxSize={8} />
              <Box fontSize="2xl" ml={2}>
                Upload Files
              </Box>
            </Flex>
            <ModalCloseButton
              position="absolute"
              top="28px" 
              right="25px"
              size="md"
            />
          </ModalHeader>
          <ModalBody pb={0}>
            {/* File upload box */}
            <Box border="2px dashed" p={4} borderRadius="2xl">
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Icon as={IoCloudUploadOutline} boxSize={12} mb={2} />
                <Text fontWeight="bold">Drag and drop files here</Text>
                <Text color="#8E95A3">or</Text>
                {/* <Button
                  as="label"
                  htmlFor="fileInput"
                  variant="solid"
                  mt={2}
                  bgGradient="linear(to-r, linear.100, linear.200)"
                  _hover={{
                    cursor: "pointer",
                    color: "white",
                    bg: "brand.300",
                  }}
                  rounded={"xl"}
                  color="brand.200"
                >
                  Browse Files
                  <Input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                  />
                </Button> */}
                <Button
                  as="label"
                  htmlFor="fileInput"
                  variant="solid"
                  mt={2}
                  bgGradient="linear(to-r, linear.100, linear.200)"
                  _hover={{
                    cursor: "pointer",
                    color: "white",
                    bg: "brand.300",
                  }}
                  rounded={"xl"}
                  color="brand.200"
                >
                  Browse Files
                </Button>
                {/* TODO: Link file uploads for button/drag + drop */}
              </Flex>
            </Box>
            <Text color="#8E95A3" mt={3}>
              Only .mp3 files. Max size 30mb.
            </Text>

            {/* File list */}
            <ModalHeader pl={0}>
              <Box fontSize="l">Uploaded Files</Box>
            </ModalHeader>
            <Box
              mb={5}
              overflowY="auto"
              maxHeight="275px"
              paddingRight="10px"
              // Custom scrollbar
              css={{
                "&::-webkit-scrollbar": {
                  width: "5px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "transparent",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                  borderRadius: "10px",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              <FileUploadCard 
                fileName="PRIDE. - Kendrick Lamar.mp3" 
                fileSizeInBytes={10830000} 
                uploadFailed={false} 
                inProgress={true}
                progressValue={72}
              />
              <FileUploadCard 
                fileName="Show Me How - Men I Trust.mp3"
                fileSizeInBytes={1120000}
                uploadFailed={true}
                inProgress={false}
                progressValue={0}
              />
              <FileUploadCard 
                fileName="No More Parties In LA - Kanye West.mp3" 
                fileSizeInBytes={14800000} 
                uploadFailed={false} 
                inProgress={false}
                progressValue={100}
              />
              <FileUploadCard 
                fileName="No More Parties In LA - Kanye West.mp3" 
                fileSizeInBytes={14800000} 
                uploadFailed={false} 
                inProgress={false}
                progressValue={100}
              />
            </Box>

            {/* Modal footer */}
            <Flex justifyContent="space-between">
              <Button
                flex="1"
                bg="#F7FAFC"
                color={"black"}
                _hover={{ color: "white", bg: "brand.300" }}
                size="lg"
                variant="solid"
                rounded={"xl"}
                onClick={onClose}
                mr={4}
              >
                Cancel
              </Button>
              <Button
                flex="1"
                bgGradient="linear(to-r, linear.100, linear.200)"
                _hover={{ color: "white", bg: "brand.300" }}
                size="lg"
                variant="solid"
                rounded={"xl"}
                color="brand.200"
                onClick={onClose}
              >
                Confirm
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileUploadBox;