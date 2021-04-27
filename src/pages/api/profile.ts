import { NextApiRequest, NextApiResponse } from "next";
import { Request } from "express";
import multer from "multer";
import { parse } from "cookie";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    upload.single("file");

    console.log(req.body);

    let file: File;
    const cookies = parse(req.headers.cookie as string);
  } else {
    res.setHeader("allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
