import {
  Button,
  Box,
  AbsoluteCenter,
  Container,
  Stack,
  Heading,
} from "@chakra-ui/react";

// Put Zip function here
function download(files) {
  let test = files[0]; // ideally the zipped file
  const fileName = test.split("/").pop(); // exclude the file path
  const aTag = document.createElement("a"); // create a 'dummy' anchor element
  aTag.href = test;
  aTag.setAttribute("download", fileName); // allow dummy element to be downloaded
  document.body.appendChild(aTag);
  aTag.click();
  aTag.remove(); // remove dummy anchor
}

let DownloadButton = ({ selected_files }) => {
  console.log("inside download button");
  console.log(selected_files);
  console.log(typeof selected_files);
  return (
    <Container centerContent>
      <Stack>
        <Heading>Download Your Files Here!</Heading>
        <Box bg="green.100" padding={"10px"}>
          {selected_files.map((f) => {
            return (
              <Box key={f} bg="green.400" textAlign={"center"} padding={"10px"}>
                {f.split("/").pop()}
              </Box> // display all the files to be zipped
            );
          })}
        </Box>
        <Box position="relative" h="100px">
          <AbsoluteCenter bg="green.100" p="4" color="white" axis="both">
            <Button
              onClick={() => download(selected_files)}
              justifyContent={"center"}
            >
              Download Zip
            </Button>
          </AbsoluteCenter>
        </Box>
      </Stack>
    </Container>
  );
};
export default DownloadButton;
