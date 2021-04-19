import { useToast } from "@chakra-ui/toast";
import { useSession } from "next-auth/client";
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
  const [session] = useSession();
  const toast = useToast();

  function addToWishlist(product: FaunaProduct) {
    if (!session) {
      toast({
        title: "Wishlist",
        description: "You must first login for add to wishlist",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }

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
