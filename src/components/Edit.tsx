import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Image,
} from "@chakra-ui/react";

interface EditComponentProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Edit: React.FC<EditComponentProps> = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent bg={"brand.200"} pb={25} borderRadius={"xl"}>
          <ModalHeader>Edit</ModalHeader>
          {/* TODO: FIX PLACEMENT OF CLOSE BUTTON */}
          <ModalCloseButton />
          <ModalBody>
            <Grid
              h="sm"
              templateRows="repeat(30, 1fr)"
              templateColumns="repeat(34, 1fr)"
              gap={4}
            >
              <GridItem rowSpan={12} colSpan={12}>
                {" "}
                <Image
                  src="https://lastfm.freetls.fastly.net/i/u/770x0/cb8e41ecc96f769575babd440b81e795.jpg#cb8e41ecc96f769575babd440b81e795"
                  alt="Album Cover"
                  borderRadius={"5px"}
                />
              </GridItem>
              {/*TODO: Change on focus color for input */}
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Song Title</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Artist(s)</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Year</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Album Title</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Genre</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={22}>
                <FormControl>
                  <FormLabel>Album Artist(s)</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
              <GridItem rowSpan={6} colSpan={12}>
                <FormControl>
                  <FormLabel>Track</FormLabel>
                  <Input />
                </FormControl>
              </GridItem>
            </Grid>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<CheckIcon />}
              bgGradient="linear(to-r, linear.100, linear.200)"
              // isLoading
              // loadingText={'Submitting'}
              size="md"
              variant="solid"
              onClick={onClose}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Edit;
