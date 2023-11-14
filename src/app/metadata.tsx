import * as NodeID3 from 'node-id3';

export function update_metadata(tags: {}, mp3File: string): boolean {
  try {
    const success = NodeID3.update(tags, mp3File);
    if (success) {
      console.log('Metadata successfully updated.');
      return true;
    } else {
      console.log('Failed to update.');
      return false;
    }
  } catch (error) {
    console.error('An error occurred:', error.message);
    return false;
  }
}

export function read_metadata(mp3File: string): NodeID3.Tags {
  //add error checking?
  return NodeID3.read(mp3File);
}

export function reset_metadata(mp3File: string) {
  //add error checking?
  console.log("in reset_metadata from metadata.tsx")
  return NodeID3.removeTags(mp3File)
}
