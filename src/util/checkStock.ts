import { NextApiResponse } from "next";

import { api } from "../services/api";
import { db } from "../firebase";
import { Stock } from "../@Types";

interface ParansStock {
  id: string;
  quantity?: number;
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
