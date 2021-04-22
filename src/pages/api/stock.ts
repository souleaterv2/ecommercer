import { NextApiRequest, NextApiResponse } from "next";
import { checkStock } from "../../util/checkStock";
export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { product } = req.body;

  checkStock(product, res);
}
