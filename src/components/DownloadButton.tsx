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
  console.log("Inside download")
  for(let i = 0; i < files.length; i++){
    let f = files[i]; 
    const fileName = (f["filePath"]).split("/").pop();
    console.log(fileName)
    const aTag = document.createElement("a");
    const filePath = f["filePath"]
    console.log(filePath);
    // create a blob object from the file data
    const blob = new Blob([f["raw"]], {type: "audio/mpeg"});
    // create a blob URL from the blob object
    const blobURL = URL.createObjectURL(blob);
    // use the blob URL as the href attribute
    aTag.href = blobURL;
    aTag.setAttribute("download", fileName);
    document.body.appendChild(aTag);
    aTag.click();
    aTag.remove(); // remove dummy anchor
    // revoke the blob URL to free memory
    URL.revokeObjectURL(blobURL);
  }
}

type DownloadButtonProps = {
  selected_files: JSON[]
};
let DownloadButton = ({ selected_files }: DownloadButtonProps) => {
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
              <Box key={f["title"]} bg="green.400" textAlign={"center"} padding={"10px"} margin={"10px"}>
                {f["title"] }
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
