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
  FormControl,
  FormLabel,
  Input,
  Switch,
} from "@chakra-ui/react";
import { MdOutlineFilePresent } from "react-icons/md";
import FileUploadCard from "./FileUploadCard";

interface FileCardGeneratorProps {
  isCardOpen: boolean; // Whether the FileCardGenerator modal is open or not
  onCardClose: () => void; // Function to close the FileCardGenerator modal
}

export const FileCardGenerator: React.FC<FileCardGeneratorProps> = ({
  isCardOpen,
  onCardClose,
}) => {
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSizeInBytes, setFileSizeInBytes] = useState(0);
  const [uploadFailed, setUploadFailed] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  const handleGenerate = () => {
    // Create a new FileUploadCard component with the provided values
    const newFileUploadCard = (
      <FileUploadCard
        fileName={fileName}
        fileType={fileType}
        fileSizeInBytes={fileSizeInBytes}
        uploadFailed={uploadFailed}
        inProgress={inProgress}
        progressValue={progressValue}
      />
    );

    // Render the newly generated FileUploadCard component or take other actions as needed
    console.log("Generated FileUploadCard:", newFileUploadCard);

    // Close the modal
    onCardClose();
  };

  return (
    <>
      {/* Modal component */}
      <Modal
        isOpen={isCardOpen}
        onClose={onCardClose}
        size="lg"
        closeOnOverlayClick={false}
      >
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
                Generate Files
              </Box>
            </Flex>
            <ModalCloseButton position="absolute" top="28px" right="25px" size="md" />
          </ModalHeader>
          <ModalBody pb={0}>
            {/* File upload form */}
            <Box border="2px dashed" p={4} borderRadius="2xl" mb={4}>
              <FormControl>
                <FormLabel>File Name</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter file name"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>File Type</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter file type"
                  value={fileType}
                  onChange={(e) => setFileType(e.target.value)}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>File Size (in bytes)</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter file size"
                  value={fileSizeInBytes}
                  onChange={(e) => setFileSizeInBytes(parseInt(e.target.value))}
                />
              </FormControl>
              <Flex mt={4}>
                <FormControl display="flex" alignItems="center" mr={4}>
                  <FormLabel htmlFor="uploadFailed" mb="0">
                    Upload Failed
                  </FormLabel>
                  <Switch
                    id="uploadFailed"
                    isChecked={uploadFailed}
                    onChange={() => setUploadFailed(!uploadFailed)}
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center" mr={4}>
                  <FormLabel htmlFor="inProgress" mb="0">
                    In Progress
                  </FormLabel>
                  <Switch
                    id="inProgress"
                    isChecked={inProgress}
                    onChange={() => {
                      setInProgress(!inProgress);
                      setProgressValue(0); // Reset progress value when toggled off
                    }}
                  />
                </FormControl>
              </Flex>
              {inProgress && (
                <FormControl mt={4}>
                  <FormLabel>Progress Value (0-100)</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter progress value"
                    min={0}
                    max={100}
                    value={progressValue}
                    onChange={(e) => setProgressValue(parseInt(e.target.value))}
                  />
                </FormControl>
              )}
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
                onClick={onCardClose}
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
                onClick={handleGenerate}
              >
                Generate
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FileCardGenerator;
