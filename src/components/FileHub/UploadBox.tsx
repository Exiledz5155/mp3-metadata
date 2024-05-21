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
  const { uuid, generateUUID } = useUUID();
  const [files, setFiles] = useState<File[]>([]); // Initialize with an empty array
  const [modalSize, setModalSize] = useState<"xl" | "full">("xl");
  // const onDrop = useCallback((acceptedFiles: File[]) => {
  //   setFiles(acceptedFiles);
  // }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // just like handleDeleteFile below, we just add and filter the collection of files
    setFiles((prevFiles) => {
      const allFiles = [...prevFiles, ...acceptedFiles];

      // remove duplicates
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
    };
  }>({});

  const handleDeleteFile = (fileName: string) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
    setUploadStatus((prevStatus) => {
      const { [fileName]: _, ...rest } = prevStatus;
      return rest;
    });
  };

  // NO IDEA IF THIS WORKS, NEED TO FIND METHOD TO FORCE ERROR
  const handleRetry = async (fileName: string) => {
    // Set upload as in progress before the retry
    setUploadStatus((prevStatus) => ({
      ...prevStatus,
      [fileName]: {
        inProgress: true,
        uploadFailed: false,
        isComplete: false,
      },
    }));

    // Retrieve the file from the files array based on fileName
    const file = files.find((f) => f.name === fileName);
    if (!file) {
      toast({
        title: "Error",
        description: "File is not an MP3.",
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
      // Attempt to upload the file again
      const response = await UploadMP3(file, uuid);
      if (response.ok) {
        console.log("File re-uploaded successfully");
        refetchData();
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [fileName]: {
            inProgress: false,
            uploadFailed: false,
            isComplete: true,
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
        },
      }));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) {
      setFiles(Array.from(fileList)); // Convert FileList to an array and store in state
    }
  };

  const handleUpload = async () => {
    if (files.length > 0) {
      for (const file of files) {
        if (!file.name.endsWith(".mp3")) {
          toast({
            title: "Error",
            description: "File is not an MP3.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          console.error(`Error: File ${file.name} is not a .mp3 file.`);
          continue;
        }

        const fileName = file.name;
        setUploadStatus((prevStatus) => ({
          ...prevStatus,
          [fileName]: {
            inProgress: true,
            uploadFailed: false,
            isComplete: false,
          },
        }));

        try {
          const response = await UploadMP3(file, uuid);
          if (response.ok) {
            console.log("File uploaded successfully");
            refetchData();
            setUploadStatus((prevStatus) => ({
              ...prevStatus,
              [fileName]: {
                inProgress: false,
                uploadFailed: false,
                isComplete: true,
              },
            }));
          } else {
            console.error("Failed to upload file");
            setUploadStatus((prevStatus) => ({
              ...prevStatus,
              [fileName]: {
                inProgress: false,
                uploadFailed: true,
                isComplete: false,
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
            },
          }));
        }
      }
    } else {
      console.log("No files selected.");
    }
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
            {/* Add fullscreen icon here */}
            {/* <Button
              onClick={() => setModalSize(modalSize === "lg" ? "full" : "lg")}
              variant="ghost"
              position="absolute"
              width="32px" // Set the width to match the close button size
              height="32px" // Set the height to match the close button size
              display="flex" // Ensure the icon is centered
              alignItems="center"
              justifyContent="center"
              borderRadius="md"
              top="28px"
              right="70px"
            >
              <Icon
                as={modalSize === "lg" ? MdFullscreen : MdFullscreenExit}
                boxSize={5}
              />
            </Button> */}
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
              // maxH="100%"
              // paddingRight="10px"
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
              _hover={{ color: "white", bg: "brand.300" }}
              size="lg"
              variant="solid"
              rounded={"xl"}
              onClick={handleCloseModal}
              mr={4}
            >
              Close
            </Button>
            <Button
              flex="1"
              bgGradient="linear(to-r, linear.100, linear.200)"
              _hover={{ color: "white", bg: "brand.300" }}
              size="lg"
              variant="solid"
              rounded={"xl"}
              color="brand.200"
              onClick={handleUpload}
              disabled={files.length === 0}
            >
              Upload
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
