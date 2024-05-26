"use client";

import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  Box,
  UnorderedList,
  ListItem,
  useToast,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Song } from "../../types/types";
import { useUUID } from "../../contexts/UUIDContext";

interface DeleteComponentProps {
  isOpen: boolean;
  onClose: () => void;
  songs: Song[];
}

export default function Delete({
  isOpen,
  onClose,
  songs,
}: DeleteComponentProps) {
  const { uuid } = useUUID();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const handleDelete = async () => {
    const songIds = songs.map((song) => song.id);
    const deleteUrl = `/api/delete?uuid=${uuid}&ids=${songIds.join(",")}`;

    try {
      setIsLoading(true);
      const deletePromise = fetch(deleteUrl);
      toast.promise(deletePromise, {
        loading: {
          render: () => (
            <Box
              display="flex"
              alignItems="center"
              bgGradient="linear(to-r, linear.100, linear.200)"
              color="black"
              p={3}
              borderRadius="md"
              boxShadow="lg"
            >
              <Spinner size="md" mr={3} />
              <Box>
                <strong>Delete in Progress</strong>
                <br />
                Please wait while your songs are being deleted.
              </Box>
            </Box>
          ),
        },
        success: {
          title: "Delete Completed",
          description: "Your songs have been deleted successfully.",
        },
        error: {
          title: "Delete Failed",
          description: "An error occurred while deleting your songs.",
        },
      });
      setIsLoading(false);
    } catch (error) {
      console.error("Error during delete:", error);
    }
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bg={"brand.200"}>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Songs
            </AlertDialogHeader>

            <AlertDialogBody>
              This action is can't be undone! The following songs will be
              deleted if you proceed:
              <Box
                mt={2}
                maxH={"200px"}
                overflowY={"auto"}
                css={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
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
                <UnorderedList pl={1}>
                  {songs.map((song, index) => (
                    <ListItem key={index}>{song.title}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} disabled={isLoading}>
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={handleDelete}
                ml={3}
                isDisabled={isLoading}
                isLoading={isLoading}
                loadingText="Deleting"
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
