import { Card, Stack, Button, Text, useDisclosure } from "@chakra-ui/react";

import { useState, useRef, useEffect } from "react";
import Edit from "./Edit";
import Properties from "./Properties";
import { Album, Song } from "../../types/types";

/**
 * @param position x and y coordinates of the bottom left corner of the menu
 * @param onClose gets called when the menu should dissappear
 **/

interface ActionMenuComponentProps {
  songs: Song[];
  position: { x: number; y: number };
  onClose: () => void;
}

export default function ActionMenu({
  songs,
  position,
  onClose,
}: ActionMenuComponentProps) {
  // Creates a reference to the Card component
  const cardRef = useRef<HTMLDivElement>(null);
  const borderRad = "5px";
  const sizeOfFont = "md";

  const [modalType, setModalType] = useState("");
  const { isOpen, onOpen, onClose: closeDisclosure } = useDisclosure();
  const [modalSongs, setModalSongs] = useState<Song[]>([]);

  const openModal = (type: string) => {
    setModalType(type);
    setModalSongs(songs); // Assuming you have a state to keep track of songs to edit
    onOpen();
  };

  const handleClose = () => {
    setModalType("");
    onClose();
    closeDisclosure();
  };

  // Close when clicked outside the menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(event.target as Node)) {
        handleClose();
      }
    };

    // Attach the listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClose]);

  return (
    <Card
      ref={cardRef} // Attaches a reference to the Card component
      variant={"elevated"}
      margin={"auto"}
      height="auto"
      position="fixed"
      // onMouseLeave={handleMouseLeave} // onMouseLeave event handler
      top={position.y}
      left={position.x}
      borderRadius={borderRad}
    >
      <Stack
        // divider={<StackDivider />}
        spacing="0"
        bg={"brand.200"}
        borderRadius={borderRad}
      >
        <Button
          onClick={() => openModal("edit")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: borderRad,
            borderBottomLeftRadius: "0",
            borderBottomRightRadius: "0",
          }}
        >
          <svg
            width="17px"
            height="17px"
            stroke-width="2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#ffffff"
            style={{ marginRight: "0.5rem", marginLeft: "-0.5em" }}
          >
            <path
              d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M8 21.1679V14L12 7L16 14V21.1679"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M8 14C8 14 9.12676 15 10 15C10.8732 15 12 14 12 14C12 14 13.1268 15 14 15C14.8732 15 16 14 16 14"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <Text fontSize={sizeOfFont}>Edit</Text>
        </Button>
        <Button
          // onClick={() => openModal("properties")}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: 0,
          }}
        >
          <svg
            width="17px"
            height="17px"
            stroke-width="2.0"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#ffffff"
            style={{ marginRight: "0.5rem", marginLeft: "-0.5em" }}
          >
            <path
              d="M12 11.5V16.5"
              stroke="#ffffff"
              stroke-width="2.0"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 7.51L12.01 7.49889"
              stroke="#ffffff"
              stroke-width="2.0"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#ffffff"
              stroke-width="2.0"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <Text fontSize={sizeOfFont}>Properties</Text>
        </Button>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: 0,
          }}
        >
          <svg
            width="17px"
            height="17px"
            stroke-width="2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#ffffff"
            style={{ marginRight: "0.5rem", marginLeft: "-0.5em" }}
          >
            <path
              d="M9 17L15 17"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 6V13M12 13L15.5 9.5M12 13L8.5 9.5"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <Text fontSize={sizeOfFont}>Download</Text>
        </Button>
        <Button
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: borderRad,
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
          }}
        >
          <svg
            width="17px"
            height="17px"
            stroke-width="2"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            color="#ffffff"
            style={{ marginRight: "0.5rem", marginLeft: "-0.5em" }}
          >
            <path
              d="M8 12H16"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#ffffff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
          </svg>
          <Text fontSize={sizeOfFont}>Remove</Text>
        </Button>
      </Stack>
      <Edit
        isOpen={isOpen && modalType === "edit"}
        onClose={handleClose}
        songs={modalSongs}
      />
      {/* <Properties
        isOpen={isOpen && modalType === "properties"}
        onClose={handleClose}
        songs={songs}
      /> */}
    </Card>
  );
}
