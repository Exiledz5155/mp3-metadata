# MP3 Metadata Editor

A web-based MP3 metadata editor built with Next.js, TypeScript, and Azure Blob Storage.

## Design Doc

https://exiledz5155.github.io/MP3-Metadata-Design-Doc/

## Installation

To install the project, follow these steps:

1. Clone the repository: `git clone https://github.com/Exiledz5155/mp3-metadata.git`
2. Install dependencies: `npm install`

## Usage

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

1. Start the Next.js server: `npm run dev`
2. Access the application in your browser: [http://localhost:3000](http://localhost:3000)

## Features

- Edit MP3 metadata, including title, artist, album, etc.
- Unique sessions for each user to manage their uploaded files.
- No user accounts required.
- Hassle free

## Technologies Used

- **Next.js**: Framework for building web applications with React.
- **TypeScript**: Superset of JavaScript adding static types.
- **Azure Blob Storage**: Storage solution for user file uploads and downloads.
- **Vercel**: Platform for deploying and hosting the web application.
- **mySQL**: Efficient Blob Querying System

## Configuration

- Set up Azure Blob Storage credentials in `config.json`.
- Adjust any other configuration settings in `config.json` as needed.

## Database Schema (SUBJECT TO CHANGE)

mySQL for efficient blob querying, a brief overview of the database schema. This can include tables for user sessions, uploaded files, and any other relevant information.

## API

We might want to add details about how to interact with our system. We wil need to flesh this out later.

## Examples (SUBJECT TO CHANGE)

```typescript
// Sample TypeScript code snippet demonstrating how to use the editor API
import { editMetadata } from "mp3-metadata-editor";

const editedFile = editMetadata(file, metadata);
```

## Security Considerations

- Uploaded files are stored securely using Azure Blob Storage.
- Session IDs and uploaded files are quickly discarded after use.

For any inquiries, feel free to contact the project maintainers:

- Calvin Duddingston: duddi021@umn.edu
- Danny Bui: bui00109@umn.edu
- Nicholas Hinds: hinds084@umn.edu
- Nelson Trinh: trinh127@umn.edu
- Bernie Nnadi: nnadi014@umn.edu
- Aidan Ruiz: ruiz0150@umn.edu
- Mark Gustafson: gust0971@umn.edu
- Aitan Singh: sing0922@umn.edu
- Ethan Harris: harr3380@umn.edu
- Charles Sayles: sayle093@umn.edu
- Daniel Tran: tran1116@umn.edu

![MP3 Metadata Concept Design](photos\image1.png "An old design we showed off last fall.")
