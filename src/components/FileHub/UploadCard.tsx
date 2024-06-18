"use client";

import { Box, Flex, Icon, Progress, Text } from "@chakra-ui/react";
import { BsFillTrashFill } from "react-icons/bs";
import { FiFileText, FiRotateCcw } from "react-icons/fi";

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
  onDelete: () => void;
  progress: number;
}

export default function UploadCard({
  fileName,
  fileSizeInBytes,
  uploadFailed,
  inProgress,
  isComplete,
  onRetry,
  onDelete,
  progress,
}: FileUploadCardProps) {
  const handleRetryClick = () => {
    if (onRetry) {
      onRetry();
    }
  };

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete();
    }
  };

  // Ensure inProgress is always false if uploadFailed is true.
  // This is necessary to display the correct UI state.
  const correctedInProgress = uploadFailed ? false : inProgress;
  // const correctedInProgress = true;

  return (
    <Box border="0px" p={4} borderRadius="2xl" _hover={{ bg: "brand.300" }}>
      <Flex align="center">
        <Icon as={FiFileText} boxSize={6} />
        <Flex flex={1} pl={6} direction="column">
          <Text mb="-1" textAlign="left" noOfLines={1} userSelect="none">
            {fileName}
          </Text>
          {uploadFailed ? ( // If upload has failed, display "Upload Failed" in red
            <Text
              fontSize="xs"
              textAlign="left"
              color="#FF7074"
              userSelect="none"
            >
              Upload Failed
            </Text>
          ) : isComplete ? ( // If upload is complete, display "Upload Success" in green
            <Text
              fontSize="xs"
              textAlign="left"
              color="linear.200"
              userSelect="none"
            >
              Upload Success
            </Text>
          ) : (
            <Text
              fontSize="xs"
              textAlign="left"
              color="#8E95A3"
              mb={correctedInProgress ? "-2" : "0"}
              userSelect="none"
            >
              {`${formatFileSize(fileSizeInBytes)} | ${progress.toFixed(2)}%`}
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
              onClick={handleDeleteClick}
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
              onClick={handleDeleteClick}
              _hover={{ color: "linear.100" }}
            />
          )
        )}
      </Flex>
      {correctedInProgress && ( // Progress bar component for inProgress state
        <Progress
          mt={4}
          value={progress}
          aria-valuenow={progress}
          size="sm"
          colorScheme="linear"
          borderRadius="md"
          transition="all 0.6s ease"
          hasStripe
          isAnimated
        />
      )}
    </Box>
  );
}
