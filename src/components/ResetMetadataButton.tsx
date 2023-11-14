import { Button } from "@chakra-ui/react";

async function resetMetadata({ file }) {
    console.log("clear button pressed")
  try {
    const response = await fetch("../api/reset-metadata", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(file),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Server response:", data);
    } else {
      const errorText = await response.text();
      console.error("Failed to send filepath. Server response:", errorText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

function ResetMetadataButton({ selectFile }) {
  return (
    <Button onClick={() => resetMetadata({ file: selectFile })}>
      Reset Metadata
    </Button>
  );
}

export default ResetMetadataButton;
