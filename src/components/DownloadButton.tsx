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
  console.log("Inside download");
  for (let i = 0; i < files.length; i++) {
    let f = files[i];
    const fileName = f["filePath"].split("/").pop();
    console.log(fileName);
    const aTag = document.createElement("a");
    // use the file path as the href attribute
    aTag.href = "tmp/" + fileName;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove(); // remove dummy anchor
  }
}

type DownloadButtonProps = {
  selected_files: JSON[];
};
let DownloadButton = ({ selected_files }: DownloadButtonProps) => {
  console.log("inside download button");
  console.log(selected_files);
  console.log(typeof selected_files);
  return (
    <Container centerContent>
      <Stack>
        <Heading>Download Your Files Here!</Heading>
        <Box bg="green.100" padding={"10px"} margin="30px">
          {selected_files.map((f) => {
            return (
              <Box
                key={f["title"]}
                bg="green.400"
                textAlign={"center"}
                padding={"10px"}
                margin={"10px"}
              >
                {f["title"]}
              </Box> // display all the files to be zipped
            );
          })}
        </Box>
        <Box position="relative" bg="green.100" margin="30px">
          <AbsoluteCenter bg="green.400" p="4" color="white" axis="both">
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
