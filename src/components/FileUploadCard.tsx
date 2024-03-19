import React from "react";
import {
  Box, 
  Flex, 
  Icon, 
  Text, 
  Progress 
} from "@chakra-ui/react";
import { 
  FiFileText, 
  FiRotateCcw 
} from "react-icons/fi";
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
  fileType: string; // File extension like .mp3
  fileSizeInBytes: number;
  uploadFailed: boolean;
  inProgress: boolean;
  progressValue: number; // Value passed in Progress component, takes a number between 0 and 100
  onDelete: () => void; // Function to delete the card
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({
  fileName,
  fileType,
  fileSizeInBytes,
  uploadFailed,
  inProgress,
  progressValue,
  onDelete,
}) => {
  // Ensure inProgress is always false if uploadFailed is true.
  // This is necessary to display the correct UI state.
  const correctedInProgress = uploadFailed ? false : inProgress;

  return (
    <Box border="2px" mb={4} p={4} borderRadius="2xl">
      <Flex align="center">
        <Icon as={FiFileText} boxSize={6} />
        <Flex flex={1} pl={6} direction="column">
          <Text mb="-1" textAlign="left" noOfLines={1}>
            {fileName}{fileType}
          </Text>
          {uploadFailed ? ( // If upload has failed, display "Upload Failed" in red
            <Text fontSize="xs" textAlign="left" color="#FF7074">
              Upload Failed
            </Text>
          ) : ( // Else, check if inProgress and display UI state as needed
            <Text
              fontSize="xs"
              textAlign="left"
              color="#8E95A3"
              mb={correctedInProgress ? "-2" : "0"}
            >
              {correctedInProgress
                ? `${formatFileSize(
                    fileSizeInBytes * progressValue / 100 // Computing currently uploaded file size
                  )} | ${progressValue}%`
                : formatFileSize(fileSizeInBytes)} {/* If inProgress is false, display full file size */}
            </Text>
          )}
        </Flex>
        {uploadFailed ? ( // If upload has failed, display both the retry and delete icons
          <>
            <Icon as={BsFillTrashFill} boxSize={6} onClick={onDelete} style={{cursor: "pointer"}} mr={5} />
            <Icon as={FiRotateCcw} boxSize={6} onClick={onDelete} style={{cursor: "pointer"}} />
          </>
        ) : ( // If upload is successful or in progress, display delete icon only
          <Icon as={BsFillTrashFill} boxSize={6} onClick={onDelete} style={{cursor: "pointer"}} />
        )}
      </Flex>
      {correctedInProgress && ( // Progress bar component for inProgress state
        <Progress
          mt={4}
          value={progressValue}
          size="sm"
          colorScheme="linear"
          borderRadius="md"
        />
      )}
    </Box>
  );
};

export default FileUploadCard;