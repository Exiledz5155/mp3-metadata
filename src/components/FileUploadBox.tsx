import React, { useState } from "react";
import {
  Flex,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Icon,
  Box,
  Text,
  Input,
} from "@chakra-ui/react";
import FileCardGenerator from "./FileCardGenerator";
import { MdOutlineFilePresent } from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";

interface UploadBoxProps {
  isOpen: boolean; // Whether the modal is open or not
  onClose: () => void; // Function to close the modal
}

export const FileUploadBox: React.FC<UploadBoxProps> = ({
  isOpen,
  onClose,
}) => {
  // Determining if FileCardGenerator component is open
  const [isGeneratorOpen, setGeneratorOpen] = useState(false); 

  // Initializing array of generated FileUploadCards
  const [generatedCards, setGeneratedCards] = useState<JSX.Element[]>([]); 

  // Function to open the FileCardGenerator component
  const handleGenerateFiles = () => {
    setGeneratorOpen(true);
  };

  // Function to close the FileCardGenerator component
  const handleCardClose = () => {
    setGeneratorOpen(false);
  };

  // Function to add a new generated FileUploadCard to the array
  const addGeneratedCard = (newCard: JSX.Element) => {
    setGeneratedCards((prevCards) => [...prevCards, newCard]);
  };

  // Function to delete a generated FileUploadCard from the array
  const deleteCard = (cardToDelete: React.ReactElement) => {
    setGeneratedCards((prevCards) => {
      return prevCards.filter((card) => card !== cardToDelete);
    });
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
        // Disabled clicking outside the overlay to close the modal
        closeOnOverlayClick={false} 
      >
        <ModalOverlay />
        <ModalContent 
          bg={"brand.200"} 
          py={25}
          borderRadius={"xl"} 
          // Setting lower bound on width to 60% to prevent overflow of content
          width={["100%", "60%"]}>
          <ModalHeader pt={0}>
            <Flex alignItems="center">
              <Icon as={MdOutlineFilePresent} boxSize={8} />
              <Box fontSize="2xl" ml={2}>
                Upload Files
              </Box>
            </Flex>
            <ModalCloseButton position="absolute" top="28px" right="25px" size="md" />
          </ModalHeader>
          <ModalBody pb={0}>
            <Box border="2px dashed" p={4} borderRadius="2xl">
              <Flex direction="column" justifyContent="center" alignItems="center">
                <Icon as={IoCloudUploadOutline} boxSize={12} mb={2} />
                <Text fontWeight="bold">Drag and drop files here</Text>
                <Text color="#8E95A3">or</Text>
                {/* This button should be removed once a proper backend link has been established */}
                <Button
                  as="label"
                  htmlFor="fileInput"
                  variant="solid"
                  mt={2}
                  bgGradient="linear(to-r, linear.100, linear.200)"
                  _hover={{ cursor: "pointer", color: "white", bg: "brand.300" }}
                  rounded={"xl"}
                  color="brand.200"
                  onClick={handleGenerateFiles}
                >
                  Generate Files
                </Button>
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
                {/* This component should be removed once a proper backend link has been established */}
                <FileCardGenerator
                  isGeneratorOpen={isGeneratorOpen} // Pass in the FileCardGenerator props
                  onGeneratorClose={handleCardClose}
                  addGeneratedCard={addGeneratedCard}
                />
              </Flex>
            </Box>
            <Text color="#8E95A3" mt={3}>
              Only .mp3 files. Max size 30mb.
            </Text>

            <ModalHeader pl={0}>
              <Box fontSize="l">Uploaded Files</Box>
            </ModalHeader>
            <Box
              mb={5}
              overflowY="auto"
              maxHeight="275px"
              paddingRight="10px"
              // Customizing scrollbar
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
              {generatedCards.length === 0 ? ( // Checking if the array is empty
              <Box border="2px" mb={4} p={4} borderRadius="2xl">
              <Flex align="center" justifyContent="center">
                  <Text // Default display text
                    as='i'
                    color="#8E95A3"
                    noOfLines={1}
                  >
                    Uploaded files will appear here
                  </Text>
                </Flex>
                </Box>
              ) : (
                generatedCards.map((card) => ( // Display cards/map onDelete function
                  <React.Fragment key={card.key}>
                    {React.cloneElement(card, { onDelete: () => deleteCard(card) })}
                  </React.Fragment>
                ))
              )}
            </Box>

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