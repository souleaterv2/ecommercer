import { useToast } from "@chakra-ui/toast";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import { Product, WishList } from "../@Types";
import { useAuthContext } from "../context/AuthContext";

export interface WishlistData {
  wishlistItens: WishList[];
  wishlistQuantity: number;
  addToWishlist: (product: Product) => void;
  removeFromWishList: (productID: string) => void;
  hasInWishList: (productID: string) => boolean;
}

export function useWishlist(): WishlistData {
  const [wishlistItens, setWishlistItens] = useState<WishList[]>(() => {
    const wishlist = Cookies.getJSON("StylesUP:wishlist");
    if (wishlist) {
      return wishlist;
    }

    return [];
  });
  const { user } = useAuthContext();
  const toast = useToast();

  useEffect(() => {
    Cookies.set("StylesUP:wishlist", wishlistItens);
  }, [wishlistItens]);

  function hasInWishList(productID: string) {
    return wishlistItens.some((item) => item.id === productID);
  }

  function addToWishlist(product: Product) {
    if (!user) {
      toast({
        title: "Wishlist",
        description: "You must first login for add to wishlist",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
    }

    if (!hasInWishList(product.id)) {
      setWishlistItens([
        ...wishlistItens,
        {
          id: product.id,
          image: product.images[0].url,
          name: product.name,
          price: product.price,
        },
      ]);

      toast({
        title: "Wishlist",
        description: "Added successfully",
        isClosable: true,
        duration: 2000,
        status: "success",
      });
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
    hasInWishList,
  };
}
