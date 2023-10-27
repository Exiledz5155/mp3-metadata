import {
  Button,
} from "@chakra-ui/react";

export function EditButton() {
  const handleUpdateMetadata = async () => {
    try {
      const response = await fetch('../api/update-metadata', {
        method: 'PUT',
      });
      if (response.status === 200) {
        console.log('Metadata successfully updated.');
      } else {
        console.error('Failed to update metadata.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleUpdateMetadata}>Update Metadata</Button>
    </div>
  );
}
