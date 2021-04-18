import { useState } from "react";
import { FaunaProduct } from "../@Types";

export interface WishlistData {
  wishlistItens: FaunaProduct[];
  wishlistQuantity: number;
  addToWishlist: (product: FaunaProduct) => void;
  removeFromWishList: (productID: string) => void;
}

export function useWishlist(): WishlistData {
  const [wishlistItens, setWishlistItens] = useState<FaunaProduct[]>([]);

  function addToWishlist(product: FaunaProduct) {
    if (!wishlistItens.some((item) => item.id === product.id)) {
      setWishlistItens([...wishlistItens, product]);
    }
  }

  function removeFromWishList(productID: string) {
    const newWishlist = wishlistItens.filter((item) => item.id !== productID);

    setWishlistItens(newWishlist);
  }

  return {
    wishlistItens,
    addToWishlist,
    wishlistQuantity: wishlistItens.length,
    removeFromWishList,
  };
}
