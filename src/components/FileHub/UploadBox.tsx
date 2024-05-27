"use client";

import React, { useCallback, useState } from "react";
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
  useToast,
  ModalFooter,
} from "@chakra-ui/react";
import {
  MdOutlineFilePresent,
  MdFullscreen,
  MdFullscreenExit,
} from "react-icons/md";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useDropzone } from "react-dropzone";
import { useUUID } from "../../contexts/UUIDContext";
import FileUploadCard from "./UploadCard";
import { UploadMP3 } from "../../util/UploadFiles";
import { useFetch } from "../../contexts/FetchContext";

interface UploadBoxProps {
  isOpen: boolean; // Whether the modal is open or not
  onClose: () => void; // Function to close the modal
}

export default function UploadBox({ isOpen, onClose }: UploadBoxProps) {
  const toast = useToast();
  const { refetchData } = useFetch();
  const { uuid } = useUUID();
  const [files, setFiles] = useState<File[]>([]); // Initialize with an empty array
  const [modalSize, setModalSize] = useState<"xl" | "full">("xl");
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prevFiles) => {
      const allFiles = [...prevFiles, ...acceptedFiles];

      // Remove duplicates
      const uniqueFiles = allFiles.filter(
        (file, index, self) =>
          index === self.findIndex((f) => f.name === file.name)
      );

      return uniqueFiles;
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const [uploadStatus, setUploadStatus] = useState<{
    [key: string]: {
      inProgress: boolean;
      uploadFailed: boolean;
      isComplete: boolean;
      progress: number;
    };
  }>({});

  const handleDeleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setUploadStatus((prevStatus) => {
      const { [fileName]: _, ...rest } = prevStatus;
      return rest;
    });
  };

  const handleRetry = async (fileName: string) => {
    setIsUploading(true);
    setUploadStatus((prevStatus) => ({
      ...prevStatus,
      [fileName]: {
        inProgress: true,
        uploadFailed: false,
        isComplete: false,
        progress: 0,
      },
    }));

    const file = files.find((f) => f.name === fileName);
    if (!file) {
      toast({
        title: "Error",
        description: "File not found for retry",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error("File not found for retry:", fileName);
      return;
    }

    if (file.size > 30000000) {
      toast({
        title: "File too large",
        description: "File is larger than 30 MB.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      const response = await UploadMP3(file, uuid, (progress) => {
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [fileName]: {
            ...prevStatus[fileName],
            progress,
          },
        }));
      });
      if (response.ok) {
        console.log("File re-uploaded successfully");
        refetchData();
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [fileName]: {
            inProgress: false,
            uploadFailed: false,
            isComplete: true,
            progress: 100,
          },
        }));
      } else {
        console.error("Failed to re-upload file");
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [fileName]: {
            inProgress: false,
            uploadFailed: true,
            isComplete: false,
            progress: 0,
          },
        }));
      }
    } catch (error) {
      console.error("Failed to upload file:", error);
      setUploadStatus((prevStatus) => ({
        ...prevStatus,
        [fileName]: {
          inProgress: false,
          uploadFailed: true,
          isComplete: false,
          progress: 0,
        },
      }));
    }
    setIsUploading(false);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(Array.from(fileList)); // Convert FileList to an array and store in state
    }
  };

  const handleUpload = async () => {
    setIsUploading(true);
    if (files.length > 0) {
      const uploadPromises = files.map(async (file) => {
        if (!file.name.endsWith(".mp3")) {
          return {
            fileName: file.name,
            status: "error",
            message: "File is not an MP3.",
          };
        }

        const fileName = file.name;
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [fileName]: {
            inProgress: true,
            uploadFailed: false,
            isComplete: false,
            progress: 0,
          },
        }));

        try {
          const response = await UploadMP3(file, uuid, (progress) => {
            setUploadStatus((prevStatus) => ({
              ...prevStatus,
              [fileName]: {
                ...prevStatus[fileName],
                progress,
              },
            }));
          });
          if (response.ok) {
            return {
              fileName,
              status: "success",
              message: "File uploaded successfully",
            };
          } else {
            return {
              fileName,
              status: "error",
              message: "Failed to upload file",
            };
          }
        } catch (error) {
          return {
            fileName,
            status: "error",
            message: "Failed to upload file",
          };
        }
      });

      const uploadResults = await Promise.allSettled(uploadPromises);

      uploadResults.forEach((result) => {
        if (result.status === "fulfilled") {
          const { fileName, status, message } = result.value;
          setUploadStatus((prevStatus) => ({
            ...prevStatus,
            [fileName]: {
              inProgress: false,
              uploadFailed: status === "error",
              isComplete: status === "success",
              progress:
                status === "success" ? 100 : prevStatus[fileName].progress,
            },
          }));
          if (status === "success") {
            refetchData();
          } else {
            toast({
              title: "Error",
              description: message,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          const fileName = result.reason.fileName;
          setUploadStatus((prevStatus) => ({
            ...prevStatus,
            [fileName]: {
              inProgress: false,
              uploadFailed: true,
              isComplete: false,
              progress: 0,
            },
          }));
          toast({
            title: "Error",
            description: "Failed to upload file",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      });
    } else {
      console.log("No files selected.");
    }
    setIsUploading(false);
  };

  const [resetKey, setResetKey] = useState(0); // Add this state

  const handleCloseModal = () => {
    setFiles([]);
    setUploadStatus({});
    setResetKey((prevKey) => prevKey + 1); // Update the key on close
    onClose();
  };

  return (
    <>
      <Modal
        key={resetKey} // This forces a re-mount
        isOpen={isOpen}
        onClose={handleCloseModal}
        size={modalSize}
        // Disabled clicking outside the overlay to close the modal
        closeOnOverlayClick={false}
        closeOnEsc={isUploading ? false : true}
      >
        <ModalOverlay />
        <ModalContent
          bg={"brand.200"}
          py={25}
          borderRadius={"xl"}
          // Setting lower bound on width to 60% to prevent overflow of content
          width={["100%", "60%"]}
          maxHeight={modalSize === "full" ? "100%" : "85%"}
          display="flex" // Use flex to control the layout
          flexDirection="column" // Stack the content vertically
        >
          <ModalHeader pt={0}>
            <Flex alignItems="center">
              <Icon as={MdOutlineFilePresent} boxSize={8} />
              <Box fontSize="2xl" ml={2}>
                Upload Files
              </Box>
            </Flex>
            <Box
              as="button"
              onClick={() => setModalSize(modalSize === "xl" ? "full" : "xl")}
              position="absolute"
              top="28px"
              right="65px"
              width="33px"
              height="33px"
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              bg="transparent"
              _hover={{ bg: "brand.400" }}
              p="1px"
            >
              <Icon
                as={modalSize === "xl" ? MdFullscreen : MdFullscreenExit}
                boxSize={5}
              />
            </Box>
            <ModalCloseButton
              position="absolute"
              top="28px"
              right="25px"
              size="md"
              _hover={{ bg: "brand.400" }}
              isDisabled={isUploading ? true : false}
            />
          </ModalHeader>
          <ModalBody
            pb={0}
            flex="1"
            display="flex"
            flexDirection="column"
            overflowY={"auto"}
          >
            <Box
              h={modalSize === "xl" ? "200px" : "300px"}
              border="2px dashed"
              p={4}
              borderRadius="2xl"
              borderColor={"whiteAlpha.400"}
              bg={"brand.300"}
              {...getRootProps({ className: "dropzone" })}
            >
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
                h={"100%"}
              >
                <Box {...getInputProps()} />
                <Icon as={IoCloudUploadOutline} boxSize={12} mb={2} />
                <Text fontWeight="bold">Drag and drop files here</Text>
                <Text color="#8E95A3">or</Text>
                <Button
                  as="label"
                  htmlFor="fileInput"
                  variant="solid"
                  mt={2}
                  bgGradient="linear(to-r, linear.100, linear.200)"
                  _hover={
                    isUploading
                      ? {
                          color: "brand.200",
                          bgGradient: "linear(to-r, linear.100, linear.200)",
                        }
                      : { cursor: "pointer", color: "white", bg: "brand.300" }
                  }
                  rounded={"xl"}
                  color="brand.200"
                  disabled={isUploading ? true : false}
                >
                  Browse Files
                  <Input
                    id="fileInput"
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </Button>
              </Flex>
            </Box>
            <Text color="brand.500" mt={3}>
              Only .mp3 files. Max size 30mb.
            </Text>

            <ModalHeader pl={0}>
              <Box fontSize="l">Uploaded Files</Box>
            </ModalHeader>
            <Box
              mb={5}
              overflowY="auto"
              flex="1"
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
              {files.length > 0 ? (
                files.map((file, index) => (
                  <FileUploadCard
                    key={index}
                    fileName={file.name}
                    fileSizeInBytes={file.size}
                    uploadFailed={
                      uploadStatus[file.name]?.uploadFailed || false
                    }
                    inProgress={uploadStatus[file.name]?.inProgress || false}
                    isComplete={uploadStatus[file.name]?.isComplete || false}
                    onRetry={() => handleRetry(file.name)}
                    onDelete={() => handleDeleteFile(file.name)}
                    progress={uploadStatus[file.name]?.progress || 0}
                  />
                ))
              ) : (
                <Box
                  border="2px"
                  mb={4}
                  p={4}
                  borderRadius="2xl"
                  borderColor={"brand.300"}
                  w="100%"
                >
                  <Flex align="center" justifyContent="center">
                    <Text as="i" color="brand.500" noOfLines={1}>
                      Selected files will appear here
                    </Text>
                  </Flex>
                </Box>
              )}
            </Box>
          </ModalBody>
          <ModalFooter justifyContent="space-between" pb={0}>
            <Button
              flex="1"
              bg="#F7FAFC"
              color={"black"}
              _hover={
                isUploading
                  ? { color: "black", bg: "#F7FAFC" }
                  : { color: "white", bg: "brand.300" }
              }
              size="lg"
              variant="solid"
              rounded={"xl"}
              onClick={handleCloseModal}
              mr={4}
              isDisabled={isUploading ? true : false}
            >
              Close
            </Button>

            {/* DIsplay this variant if in progress */}

            <Button
              flex="1"
              bgGradient="linear(to-r, linear.100, linear.200)"
              _hover={
                isUploading
                  ? {
                      color: "brand.200",
                      bgGradient: "linear(to-r, linear.100, linear.200)",
                    }
                  : { color: "white", bg: "brand.300" }
              }
              size="lg"
              variant="solid"
              rounded={"xl"}
              color="brand.200"
              onClick={handleUpload}
              disabled={files.length === 0 || isUploading}
              loadingText="Uploading"
              isLoading={isUploading ? true : false}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
