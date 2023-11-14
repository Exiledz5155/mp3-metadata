import { NextApiRequest, NextApiResponse } from "next";
import { reset_metadata } from "../../metadata";
import fs from "fs";

export async function PUT(req, res) {
  if (req.method === "PUT") {
    console.log("in clear api");
    const file = await req.json();
    console.log("file: ", file)
    const mp3File = file[0].filePath;
    console.log("mp3File:", mp3File)
    
    const success = reset_metadata(mp3File);
    return Response.json({ success });
  }
}
