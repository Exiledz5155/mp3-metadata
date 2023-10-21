import express from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'path';
import { update_metadata, read_metadata } from '../components/fileEditing';

const app = express();
const PORT: number | string = process.env.PORT || 3000;

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Welcome to the MP3 Metadata Editor');
});
app.get('/upload', (req, res) => {
    res.send('Upload MP3 Page');
});

app.post('/upload', upload.single('mp3file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file upload' });
    }
    const mp3File: string = req.file.path;
    const tags: update_metadata.Tags = {
        title: "New Title",
        artist: "New Artist",
        album: "New Album",
        APIC: "./example/cover.jpg",
        TRCK: "27"
    };
    const success: boolean = update_metadata(tags, mp3File);
    if (success) {
        return res.json({ message: 'File uploaded and metadata edited successfully' });
    } else {
        return res.status(500).json({ error: 'Failed to update metadata' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
