"use client";

import {
    Box,
    Heading,
    Container,
    Text,
    Button,
    Stack,
    Icon,
    useColorModeValue,
    createIcon,
    AspectRatio,
    Select,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    List,
    ListItem,
    ListIcon,
    OrderedList,
    UnorderedList,
    ButtonGroup,
    ChakraProvider,
    Checkbox,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from "@chakra-ui/react";

  // In order to pass value to a funtion, you need to use an interface
  interface NumberBoxComponents {
    defaultValue: number;
    min: number;
    max: number;
  }

  export function NumberBox({defaultValue, min, max}: NumberBoxComponents) {
    return (
      <ChakraProvider>
        <NumberInput defaultValue={defaultValue} min={min} max={max}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
    </ChakraProvider>
    )
  }