// import * as NodeID3 from "node-id3";
// const fs = require("fs");

// function update_metadata(tags: NodeID3.Tags, mp3File: string): boolean {
//   try {
//     const success = NodeID3.update(tags, mp3File);
//     if (success) {
//       console.log("Metadata successfully updated.");
//       return true;
//     } else {
//       console.log("Failed to update.");
//       return false;
//     }
//   } catch (error) {
//     console.error("An error occurred:", error.message);
//     return false;
//   }
// }

// function read_metadata(mp3File: string): NodeID3.Tags {
//   return NodeID3.read(mp3File);
// }

// export { update_metadata, read_metadata };

// // // Read the image file as a buffer
// // const imageBuffer = fs.readFileSync("/Users/dannybui/Desktop/goof.png"); // MUST CHANGE TO VALID FILE
// // // Encode the image as base64
// // const base64Image = imageBuffer.toString("base64");
// // // Include the base64-encoded image in the tags
// // const tags = {
// //   title: "this is a title",
// //   artist: "mark",
// //   album: "awesome album",
// //   APIC: {
// //     type: 3, // The type of the image (3 = cover image)
// //     data: base64Image,
// //     description: "Cover Image",
// //   },
// //   TRCK: "27",
// // };

// // const mp3File: string = "/Users/dannybui/Desktop/victorious.mp3"; // MUST CHANGE TO VALID FILE

// // update_metadata(tags, mp3File);
// // console.log(read_metadata(mp3File));
