"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  useColorMode,
  Stack,
  defineStyle, 
  defineStyleConfig
} from "@chakra-ui/react";
  import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
  import { Link } from "@chakra-ui/next-js";

interface Props {
  children: React.ReactNode;
}

const Links = ["Upload", "Edit", "Download"];


// converts a list of props (strings) into a linked ("/examplepage") navbar element
const NavLink = (props: Props) => {
  const { children } = props;
  console.log(typeof children);
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      color='white'
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("green.500", "gray.700"),
      }}
      //   Greatest bug fix of all time, DO NOT DELETE
      href={"/" + String(children).toLowerCase()}
    >
      {children}
    </Box>
  );
};

export function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <Box bg={useColorModeValue("green.400", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            colorScheme='green'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            {/* Fix underline link issue for App name redirect to home */}
            {/* refactor to Const */}


            <Link
              _hover={{
                textDecoration: "none",
              }}
              href="/"
            >
              <Box marginLeft={10} color={'white'}>MP3 Metadata</Box>
            </Link>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <Link href={link.toLowerCase()} >{link}</Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode} colorScheme='green'>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
}
