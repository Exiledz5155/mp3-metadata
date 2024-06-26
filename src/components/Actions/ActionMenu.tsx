import { Button, Card, Icon, Stack, Text } from "@chakra-ui/react";

import {
  DownloadIcon,
  EditIcon,
  InfoOutlineIcon,
  MinusIcon,
  ViewIcon,
} from "@chakra-ui/icons";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Album, Song } from "../../types/types";

/**
 * @param position x and y coordinates of the bottom left corner of the menu
 * @param onClose gets called when the menu should dissappear
 **/

interface ActionMenuComponentProps {
  album?: Album | null | undefined;
  songs?: Song[];
  position: { x: number; y: number };
  onClose: () => void;
  onEditClick: () => void;
  onPropertiesClick: () => void;
  onDownloadClick: () => void;
  onDeleteClick: () => void;
  toView: boolean;
}

export default function ActionMenu({
  album,
  songs,
  position,
  onClose,
  onEditClick,
  onPropertiesClick,
  onDownloadClick,
  onDeleteClick,
  toView,
}: ActionMenuComponentProps) {
  // Creates a reference to the Card component
  const cardRef = useRef<HTMLDivElement>(null);
  const borderRad = "5px";
  const sizeOfFont = "md";

  const handleClose = () => {
    onClose();
  };

  // Close when clicked outside the menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        handleClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
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
        {toView && album ? (
          <>
            <Link href={`/editor/${encodeURIComponent(album.album)}`} passHref>
              <Button
                w={"100%"}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  borderRadius: borderRad,
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                }}
              >
                <Icon as={ViewIcon} mr="0.5rem" ml="-0.5em" />
                <Text fontSize={sizeOfFont}>View</Text>
              </Button>
            </Link>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                onClose();
                onEditClick();
              }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                borderRadius: 0,
              }}
            >
              <Icon as={EditIcon} mr="0.5rem" ml="-0.5em" />
              <Text fontSize={sizeOfFont}>Edit</Text>
            </Button>
          </>
        ) : (
          <Button
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              onClose();
              onEditClick();
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              borderRadius: borderRad,
              borderBottomLeftRadius: "0",
              borderBottomRightRadius: "0",
            }}
          >
            <Icon as={EditIcon} mr="0.5rem" ml="-0.5em"></Icon>
            <Text fontSize={sizeOfFont}>Edit</Text>
          </Button>
        )}

        <Button
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onClose();
            onPropertiesClick();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: 0,
          }}
        >
          <Icon as={InfoOutlineIcon} mr="0.5rem" ml="-0.5em" />
          <Text fontSize={sizeOfFont}>Properties</Text>
        </Button>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onClose();
            onDownloadClick();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: 0,
          }}
        >
          <Icon as={DownloadIcon} mr="0.5rem" ml="-0.5em" />
          <Text fontSize={sizeOfFont}>Download</Text>
        </Button>
        <Button
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            onClose();
            onDeleteClick();
          }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
            borderRadius: borderRad,
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
          }}
        >
          <Icon as={MinusIcon} mr="0.5rem" ml="-0.5em" />
          <Text fontSize={sizeOfFont}>Delete</Text>
        </Button>
      </Stack>
    </Card>
  );
}
