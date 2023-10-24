import { CacheProvider } from "@chakra-ui/next-js";
import {
  Grid,
  GridItem,
  useColorModeValue,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Box,
} from "@chakra-ui/react";
import { Providers } from "../app/providers";
import { MusicCard } from "./MusicCard";

export default function DownloadHub({
  children,
}: {
  children: React.ReactNode;
}) {
  const fileHub = [
    "Song1",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
    "Song2",
  ];
  return (
    <CacheProvider>
      {/* Place stuff above providers */}

      <Grid
        h="100%"
        w="100%"
        templateRows="repeat(2, 1fr)"
        templateColumns="repeat(5, 1fr)"
        gap={4}
      >
        <GridItem
          rowSpan={2}
          colSpan={1}
          bg={useColorModeValue("green.400", "gray.900")}
        >
          <Box maxHeight="100%" overflowY="auto">
            <Table colorScheme="green" overflowY="auto">
              <Thead top={0}>
                <Tr>
                  <Th>File List</Th>
                </Tr>
              </Thead>
              <Tbody>
                {fileHub.map((file) => (
                  <Tr>
                    <MusicCard></MusicCard>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </GridItem>
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={2} bg="papayawhip" />
        <GridItem colSpan={4} bg="tomato" />
      </Grid>
      <Providers>{children}</Providers>
    </CacheProvider>
  );
}
