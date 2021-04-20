import { remove } from "js-cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    remove("StylesUP:cart", { path: "/" });
  }
}
