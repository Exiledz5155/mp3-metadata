import React from "react";
import { Box, Flex, Icon, Text, Progress } from "@chakra-ui/react";
import { FiFileText, FiRotateCcw } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";

// Function to format the fileSize string given byte size
function formatFileSize(bytes: number): string {
  const units = ["bytes", "kb", "mb", "gb"];
  let unitIndex = 0;
  while (bytes >= 1000 && unitIndex < units.length - 1) {
    bytes /= 1000;
    unitIndex++;
  }
  return `${bytes.toFixed(1)} ${units[unitIndex]}`;
}

interface FileUploadCardProps {
  fileName: string;
  fileSizeInBytes: number;
  uploadFailed: boolean;
  inProgress: boolean;
  isComplete: boolean;
  onRetry: () => void; // Callback function for retry
}

export default function FileUploadCard({
  fileName,
  fileSizeInBytes,
  uploadFailed,
  inProgress,
  isComplete,
  onRetry,
}: FileUploadCardProps) {
  const handleRetryClick = () => {
    if (onRetry) {
      onRetry();
    }
  };

  // Ensure inProgress is always false if uploadFailed is true.
  // This is necessary to display the correct UI state.
  const correctedInProgress = uploadFailed ? false : inProgress;

  return (
    <Box border="2px" mb={4} p={4} borderRadius="2xl">
      <Flex align="center">
        <Icon as={FiFileText} boxSize={6} />
        <Flex flex={1} pl={6} direction="column">
          <Text mb="-1" textAlign="left" noOfLines={1}>
            {fileName}
          </Text>
          {uploadFailed ? ( // If upload has failed, display "Upload Failed" in red
            <Text fontSize="xs" textAlign="left" color="#FF7074">
              Upload Failed
            </Text>
          ) : isComplete ? ( // If upload is complete, display "Upload Success" in green
            <Text
              fontSize="xs"
              textAlign="left"
              // bgGradient="linear(to-r, linear.100, linear.200)"
              // bgClip="text"
              color="linear.200"
            >
              Upload Success
            </Text>
          ) : (
            // Else, check if inProgress and display UI state as needed
            <Text
              fontSize="xs"
              textAlign="left"
              color="#8E95A3"
              mb={correctedInProgress ? "-2" : "0"}
            >
              {formatFileSize(fileSizeInBytes)}
            </Text>
          )}
        </Flex>
        {uploadFailed ? ( // If upload has failed, display both the retry and delete icons
          <>
            <Icon
              as={BsFillTrashFill}
              boxSize={6}
              style={{ cursor: "pointer" }}
              mr={5}
            />
            <Icon
              as={FiRotateCcw}
              boxSize={6}
              style={{ cursor: "pointer" }}
              onClick={handleRetryClick}
            />
          </>
        ) : (
          !inProgress &&
          !isComplete && ( // Display delete icon only if neither in progress nor complete
            <Icon
              as={BsFillTrashFill}
              boxSize={6}
              style={{ cursor: "pointer" }}
            />
          )
        )}
      </Flex>
      {inProgress && ( // Progress bar component for inProgress state
        <Progress
          mt={4}
          isIndeterminate
          size="sm"
          colorScheme="linear"
          borderRadius="md"
        />
      )}
    </Box>
  );
}
