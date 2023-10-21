const NodeID3 = require('node-id3')
module.exports = { update_metadata, read_metadata };

function update_metadata(tags, mp3File) {
    const success = NodeID3.update(tags, mp3File)
    if (success) {
        console.log('Metadata successfully updated.')
    } 
    else {
        console.log('Failed to update.')
    }
    return success;
}

function read_metadata(mp3File) {
    return NodeID3.read(mp3File)
}

//test
const mp3File = 'C:/Users/Mark/Desktop/test.mp3';
const tags = {
    title: "this is a title",
    artist: "mark",
    album: "awesome album",
    APIC: "./example/cover.jpg",
    TRCK: "27"
}
update_metadata(tags, mp3File)
console.log(read_metadata(mp3File))


