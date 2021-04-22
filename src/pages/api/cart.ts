import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const r = "";
  } else {
    res.setHeader("allow", "POST");
    res.status(405).end("Method not allowed");
  }
}
