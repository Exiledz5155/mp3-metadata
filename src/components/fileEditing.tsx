import * as NodeID3 from 'node-id3';

export function update_metadata(tags: NodeID3.Tags, mp3File: string): boolean {
  const success = NodeID3.update(tags, mp3File);
  if (success) {
    console.log('Metadata successfully updated.');
  } else {
    console.log('Failed to update.');
  }
  return success;
}

export function read_metadata(mp3File: string): NodeID3.Tags {
  return NodeID3.read(mp3File);
}

// Test
const mp3File: string = 'C:/Users/Mark/Desktop/test.mp3';
const tags: NodeID3.Tags = {
  title: "this is a title",
  artist: "mark",
  album: "awesome album",
  APIC: "./example/cover.jpg",
  TRCK: "27"
};
update_metadata(tags, mp3File);
console.log(read_metadata(mp3File));
