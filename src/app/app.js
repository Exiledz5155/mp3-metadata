const express = require('express');
const multer = require('multer');
const fs = require('fs');
const id3Parser = require('id3-parser');
const path = require('path');
const { update_metadata, read_metadata } = require('../components/fileEditing'); // ADDED THIS
const app = express(); // Make an instance of the express app

const PORT = process.env.PORT || 3000; // Make the port that the app will listen to.
// const PORT = process.env.PORT || 3000; is setting up the port number the Express.js server

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/'); // Specific destination folder for uploaded file
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname)); // Rename the file with a time stamp
    },
});

// The destination callback is called after multer has determined where the uploaded file should be stored.
// The filename callback is called after multer has determined the name of the uploaded file.

// Callback functions are commonly used in asynchronous operations 
// to provide feedback or handle the result of an operation when it has finished. 
// They allow you to execute code after an asynchronous task has completed, which is particularly important when dealing 
// with I/O operations like file uploads, database queries, or network requests.

const upload = multer({storage}); // create a multer instance with storage configuration

app.use(express.static('public')); // server static files from public directory

app.get('/', (req, res) => {
    // Replace this with the code to render your homepage
    res.send('Welcome to the MP3 Metadata Editor'); // You can replace this with your HTML template or rendering logic
  });

  
app.get('/upload', (req, res) => {
    // This is where you can render a page for uploading MP3 files via a GET request
    res.send('Upload MP3 Page'); // Replace this with your HTML template or rendering logic
});

  
app.post('/upload', upload.single('mp3file'), (req, res) => { // Handle file upload with multer
    if(!req.file) {
        return res.status(400).json({error: 'No file upload'});
    }

    // Here, you can access the uploaded file as req.file
    
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const mp3File = req.file.path; // Assuming Multer stores the file path in req.file.path
const tags = {
    title: "New Title",
    artist: "New Artist",
    album: "New Album",
    APIC: "./example/cover.jpg",
    TRCK: "27"
};

// Update the metadata using your fileEditing.js logic
const success = update_metadata(tags, mp3File);

if (success) {
    return res.json({ message: 'File uploaded and metadata edited successfully' });
} else {
    return res.status(500).json({ error: 'Failed to update metadata' });
}
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});

// MANUALLY KILLING A LIVE SERVER:
// PS C:\Users\Calvi\Desktop\MP3 Meta data Project\mp3-metadata> tasklist | findstr "node"
// node.exe                     25672 Console                    1     39,140 K
// PS C:\Users\Calvi\Desktop\MP3 Meta data Project\mp3-metadata> taskkill /F /PID 25672
// SUCCESS: The process with PID 25672 has been terminated.