const express = require("express");
const multer = require("multer");
const path = require("path");
const { update_metadata, read_metadata } = require("./metadata"); // running 'node app.tsx' throws an error because of this import.
const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "uploads/");
  },
  filename: (req, file, callback) => {
    callback(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.use(express.static("public"));

app.post("/", upload.single("mp3file"), (req, res) => {
  if (!req.file) {
    console.log("No file uploaded"); // Log the event
    return res.status(400).json({ error: "No file upload" });
  }

  const mp3File = req.file.path;
  console.log("Uploaded file path:", mp3File); // Log the path
  const tags = {
    title: "New Title",
    artist: "New Artist",
    album: "New Album",
    APIC: "./example/cover.jpg",
    TRCK: "27",
  };

  const success = update_metadata(tags, mp3File);
  if (success) {
    console.log("Metadata updated successfully"); // Log success
    return res.json({
      message: "File uploaded and metadata edited successfully",
    });
  } else {
    console.error("Failed to update metadata"); // Log error
    return res.status(500).json({ error: "Failed to update metadata" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`); // Log server start
});
