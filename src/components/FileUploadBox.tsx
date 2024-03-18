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
  const [isCardOpen, setCardOpen] = useState(false);
  const [generatedCards, setGeneratedCards] = useState<JSX.Element[]>([]);

  const handleGenerateFiles = () => {
    setCardOpen(true);
  };

  const handleCardClose = () => {
    setCardOpen(false);
  };

  const addGeneratedCard = (newCard: JSX.Element) => {
    setGeneratedCards((prevCards) => [...prevCards, newCard]);
  };

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
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent bg={"brand.200"} py={25} borderRadius={"xl"} width={["100%", "60%"]}>
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
                <FileCardGenerator
                  isCardOpen={isCardOpen}
                  onCardClose={handleCardClose}
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
              {generatedCards.map((card) => (
                <React.Fragment key={card.key}>
                  {React.cloneElement(card, { onDelete: () => deleteCard(card) })}
                </React.Fragment>
              ))}
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
