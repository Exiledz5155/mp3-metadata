import React from "react";
import { Box, Flex, Icon, Text, Progress } from "@chakra-ui/react";
import { FiFileText, FiRotateCcw } from "react-icons/fi";
import { BsFillTrashFill } from "react-icons/bs";

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
  fileType: string;
  fileSizeInBytes: number;
  uploadFailed: boolean;
  inProgress: boolean;
  progressValue: number;
}

export const FileUploadCard: React.FC<FileUploadCardProps> = ({
  fileName,
  fileType,
  fileSizeInBytes,
  uploadFailed,
  inProgress,
  progressValue,
}) => {
  // Ensure inProgress is always false if uploadFailed is true
  const correctedInProgress = uploadFailed ? false : inProgress;

  return (
    <Box border="2px" mb={4} p={4} borderRadius="2xl">
      <Flex align="center">
        <Icon as={FiFileText} boxSize={6} />
        <Flex flex={1} pl={6} direction="column">
          <Text mb="-1" textAlign="left" noOfLines={1}>
            {fileName}.{fileType}
          </Text>
          {uploadFailed ? (
            <Text fontSize="xs" textAlign="left" color="#FF7074">
              Upload Failed
            </Text>
          ) : (
            <Text
              fontSize="xs"
              textAlign="left"
              color="#8E95A3"
              mb={correctedInProgress ? "-2" : "0"}
            >
              {correctedInProgress
                ? `${formatFileSize(
                    fileSizeInBytes * progressValue / 100
                  )} | ${progressValue}%`
                : formatFileSize(fileSizeInBytes)}
            </Text>
          )}
        </Flex>
        {uploadFailed ? (
          <>
            <Icon as={BsFillTrashFill} boxSize={6} mr={5} />
            <Icon as={FiRotateCcw} boxSize={6} />
          </>
        ) : (
          <Icon as={BsFillTrashFill} boxSize={6} />
        )}
      </Flex>
      {correctedInProgress && (
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