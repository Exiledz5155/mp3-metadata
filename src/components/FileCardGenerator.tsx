import React, { useState, useEffect } from "react";
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
  FormErrorMessage,
} from "@chakra-ui/react";
import { MdOutlineFilePresent } from "react-icons/md";
import FileUploadCard from "./FileUploadCard";

interface FileCardGeneratorProps {
  isCardOpen: boolean;
  onCardClose: () => void;
  addGeneratedCard: (newCard: JSX.Element) => void;
}

export const FileCardGenerator: React.FC<FileCardGeneratorProps> = ({
  isCardOpen,
  onCardClose,
  addGeneratedCard,
}) => {
  const [inProgress, setInProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileSize, setFileSize] = useState<number | string>("");
  const [uploadFailed, setUploadFailed] = useState(false);
  const [progressValueError, setProgressValueError] = useState("");

  useEffect(() => {
    if (!isCardOpen) {
      setInProgress(false);
      setProgressValue(0);
      setFileName("");
      setFileType("");
      setFileSize("");
      setUploadFailed(false);
      setProgressValueError("");
    }
  }, [isCardOpen]);

  const handleGenerate = () => {
    if (inProgress && (progressValue < 0 || progressValue > 100)) {
      setProgressValueError("Enter a value between 0 and 100");
      return;
    }

    const newCard = (
      <FileUploadCard
        fileName={fileName}
        fileType={fileType}
        fileSizeInBytes={parseInt(fileSize as string)}
        uploadFailed={uploadFailed}
        inProgress={inProgress}
        progressValue={progressValue}
        onDelete={() => {}} // Deletion is handled in FileUploadBox.tsx
      />
    );
    addGeneratedCard(newCard);
    onCardClose();
  };

  return (
    <>
      <Modal isOpen={isCardOpen} onClose={onCardClose} size="lg" closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent bg={"brand.200"} py={25} borderRadius={"xl"} width={["100%", "60%"]}>
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
                  onChange={(e) => {
                    let value = e.target.value;
                    // Ensure the input always starts with a dot (".")
                    if (!value.startsWith(".")) {
                      value = "." + value;
                    }
                    setFileType(value);
                  }}
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>File Size (in bytes)</FormLabel>
                <Input
                  type="number"
                  placeholder="Enter file size"
                  value={fileSize as string}
                  onChange={(e) => setFileSize(e.target.value)}
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
                    onChange={(e) => setUploadFailed(e.target.checked)}
                  />
                </FormControl>
                <FormControl display="flex" alignItems="center" mr={4}>
                  <FormLabel htmlFor="inProgress" mb="0">
                    In Progress
                  </FormLabel>
                  <Switch
                    id="inProgress"
                    isChecked={inProgress}
                    onChange={(e) => {
                      setInProgress(e.target.checked);
                      setProgressValue(0);
                    }}
                  />
                </FormControl>
              </Flex>
              {inProgress && (
                <FormControl mt={4} isInvalid={!!progressValueError}>
                  <FormLabel>Progress Value (0-100)</FormLabel>
                  <Input
                    type="number"
                    placeholder="Enter progress value"
                    min={0}
                    max={100}
                    value={progressValue}
                    onChange={(e) => {
                      setProgressValue(parseInt(e.target.value));
                      setProgressValueError("");
                    }}
                  />
                  <FormErrorMessage>{progressValueError}</FormErrorMessage>
                </FormControl>
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