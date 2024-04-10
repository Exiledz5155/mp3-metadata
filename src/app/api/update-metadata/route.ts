import { NextApiRequest, NextApiResponse } from "next";
import { update_metadata } from "../../metadata";
import fs from "fs";

export async function PUT(req, res) {
  if (req.method === "PUT") {
    const tags = await req.json();
    //TODO remove empty fields from dict
    console.log(tags);
    const mp3File = tags.filePath;
    delete tags['filePath'];

    const success = update_metadata(tags, mp3File);

    return Response.json({ success });
  }
}
