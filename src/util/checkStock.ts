import { api } from "../services/api";

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
