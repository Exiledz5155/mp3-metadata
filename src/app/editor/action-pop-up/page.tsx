"use client";

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

export default function ActionPopUp() {

    

    return (
        <Card variant={"elevated"} w={"20%"} margin={"auto"}>
          <Stack divider={<StackDivider />} spacing="0">
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
        </Card>
      );
}