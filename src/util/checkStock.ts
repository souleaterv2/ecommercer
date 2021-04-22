import { NextApiResponse } from "next";

import { api } from "../services/api";
import { db } from "../firebase";
import { Stock } from "../@Types";

interface ParansStock {
  id: string;
  quantity?: number;
}

export async function checkStock(
  product: ParansStock = { id: "", quantity: null },
  res: NextApiResponse
): Promise<void> {
  try {
    const stock = await db.query<Stock>("stock", "id", "==", product.id);
    if (stock[0].quantity > 0 && !product.quantity) {
      return res.json({ haveInStock: true });
    }

    if (product.quantity && stock[0].quantity > product.quantity) {
      return res.json({ haveInStock: true });
    }

    res.json({ haveInStock: false });
  } catch (error) {
    console.log(error);
    res.status(400).end("Item not found");
  }
}

export async function fetchStock(product: ParansStock): Promise<boolean> {
  try {
    const stock = await api.post<{ haveInStock: boolean }>("/stock", {
      product,
    });

    if (stock.data.haveInStock) {
      return true;
    }

    return false;
  } catch (error) {
    console.log(error);
  }
}
