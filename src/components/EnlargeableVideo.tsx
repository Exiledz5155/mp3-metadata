import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

interface EnlargeableVideoProps {
  src: string;
  alt: string;
}

export default function EnlargeableVideo({ src, alt }: EnlargeableVideoProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        position="relative"
        overflow="hidden"
        borderRadius={10}
        cursor="pointer"
        onClick={onOpen}
      >
        <video
          style={{
            maxHeight: "1000px",
            width: "100%",
            borderRadius: "10px",
            transition: "transform 0.3s ease-in-out",
          }}
          src={src}
          loop
          muted
          autoPlay
          playsInline
        />
        <Flex
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0,0,0,0.5)"
          alignItems="center"
          justifyContent="center"
          opacity="0"
          transition="opacity 0.3s ease-in-out"
          _hover={{
            opacity: 1,
          }}
        >
          <Text color="white" fontSize="xl" fontWeight="bold">
            Click to enlarge
          </Text>
        </Flex>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} size="full">
        <ModalOverlay />
        <ModalContent bg="rgba(0, 0, 0, 0.8)">
          <ModalBody
            display="flex"
            justifyContent="center"
            alignItems="center"
            position="relative"
          >
            <Box position="relative" maxH="90vh" maxW="90vw">
              <video
                src={src}
                style={{
                  maxHeight: "90vh",
                  maxWidth: "90vw",
                  objectFit: "contain",
                }}
                controls
                autoPlay
                loop
              />
              <ModalCloseButton
                aria-label="Close modal"
                position="absolute"
                right="0"
                top="-50"
                onClick={onClose}
                color="white"
              />
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
