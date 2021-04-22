import { NextApiRequest, NextApiResponse } from "next";
import { Stock } from "../../@Types";
import { db } from "../../firebase";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  const { product } = req.body;

  try {
    const stock = await db.query<Stock>("stock", "id", "==", product.id);
    if (stock[0].quantity > 0 && !product?.quantity) {
      return res.json({ haveInStock: true });
    }

    if (product?.quantity && stock[0].quantity > product?.quantity) {
      return res.json({ haveInStock: true });
    }

    res.json({ haveInStock: false });
  } catch (error) {
    console.log(error);
    res.status(400).end("Item not found");
  }
}
