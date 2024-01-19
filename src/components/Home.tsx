import { Box, Center, Heading, Stack } from "@chakra-ui/react";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { chakra } from "@chakra-ui/react";

const LinkButton   = chakra<typeof NextLink, NextLinkProps>(NextLink, {
  // ensure that you're forwarding all of the required props for your case
  shouldForwardProp: (prop) => ["href", "target", "children"].includes(prop),
});

export function Home() {
  return (
    <>
      <Stack
        as={Box}
        textAlign={"left"}
        spacing={{ base: 4, md: 10 }}
        py={{ base: 20, md: 60 }}
      >
        <Heading
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
          marginLeft={"20"}
        >
          MP3 Metadata Editor
        </Heading>
        <LinkButton
          href="albums"
          p={2}
          color="white"
          fontSize={{ base: "md", sm: "lg", md: "lg" }}
          borderRadius="full"
          bgGradient="linear(to-r, purple.600, cyan.600)"
          _hover={{
            bgGradient: "linear(to-r, purple.300, cyan.300)",
          }}
          h=""
          w="80"
          marginLeft={"20"}
        >
          <Center>Start Editing</Center>
        </LinkButton>
      </Stack>
    </>
  );
}
