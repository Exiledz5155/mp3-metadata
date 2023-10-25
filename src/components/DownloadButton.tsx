import {
  Button,
  Box,
  AbsoluteCenter,
  Container,
  Stack,
  Heading,
} from "@chakra-ui/react";

function DownloadButton() {
  let test = "/test.txt"; // ideally the zipped file
  let files = [test, "another_test.txt"]; // ideally - list of files to be zipped into the zipped file
  const downloadFileAtURL = (url) => {
    const fileName = url.split("/").pop(); // exclude the file path
    const aTag = document.createElement("a"); // create a 'dummy' anchor element
    aTag.href = url;
    aTag.setAttribute("download", fileName); // allow dummy element to be downloaded
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove(); // remove dummy anchor
  };
  return (
    <Container centerContent>
      <Stack>
        <Heading>Download Your Files Here!</Heading>
        <Box bg="green.100" padding={"10px"}>
          {files.map((f) => (
            <Box key={f} bg="green.400" textAlign={"center"} padding={"10px"}>
              {f.split("/").pop()}
            </Box> // display all the files to be zipped
          ))}
        </Box>
        <Box position="relative" h="100px">
          <AbsoluteCenter bg="green.100" p="4" color="white" axis="both">
            <Button
              onClick={() => downloadFileAtURL(test)}
              justifyContent={"center"}
            >
              Download Zip
            </Button>
          </AbsoluteCenter>
        </Box>
      </Stack>
    </Container>
  );
}
export default DownloadButton;
