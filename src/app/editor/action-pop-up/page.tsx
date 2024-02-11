"use client";

/*
  Notes to come back to:
    - make this into a component instead
    - don't even make this a page just add the component straight to SongGridCard.tsx??
*/

import {
  ChakraProvider,
  Heading,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  StackDivider,
  Box,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

import { ChangeEvent, useState } from "react";

export default function ActionPopUp() {

  const [showCard, setShowCard] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleRightClick = (e) => {
    e.preventDefault(); // Prevent default right-click behavior
    setShowCard(true);
    setPosition({ x: e.clientX, y: e.clientY });
  };

  // closes the card when user clicks outside of the component
  const handleClose = () => {
    setShowCard(false);
  };

  // closes the card wen the mouse leaves the card
  const handleMouseLeave = () => {
    setShowCard(false);
  };

  return (
    <Card 
      variant={"elevated"} w={"20%"} margin={"auto"}
      onContextMenu={handleRightClick}
      onMouseLeave={handleMouseLeave}
      height="100vh"
      position="relative"
    >
      {showCard && (
        <Stack 
          position="absolute"
          top={position.y}
          left={position.x}
          divider={<StackDivider />} 
          spacing="0"
        >
          <Button style={{ borderRadius: 0 }}>
            <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fedit_3597088&psig=AOvVaw2JgcGVQNGv52SoW_HZFHmj&ust=1706917654022000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLC86_epi4QDFQAAAAAdAAAAABAI" />
            <text> Edit </text>
          </Button>
          <Button style={{ borderRadius: 0 }}>
            <text> Properties </text>
          </Button>
          <Button style={{ borderRadius: 0 }}>
            <text> Download </text>
          </Button>
          <Button style={{ borderRadius: 0 }}>
            <text> Remove </text>
          </Button>
        </Stack> 
      )}
    </Card>
  );
}