import { createContext, useContext, useState } from "react";
import { FaunaProduct } from "../@Types";

type Content =
  | "orders"
  | "wishlist"
  | "tickets"
  | "profile"
  | "addresses"
  | "payment";

interface WishlistData {
  wishlist: FaunaProduct[];
  wishlistQuantity: number;
  addToWishlist: (product: FaunaProduct) => void;
  removeFromWishList: (productID: string) => void;
  wislistContent: Content;
  handleWishListContent: (curent: Content) => void;
}

const WishlistContext = createContext({} as WishlistData);

export const WishlistContextProvider: React.FC = ({ children }) => {
  const [wishlist, setWishlist] = useState<FaunaProduct[]>([]);
  const [wislistContent, setWislistContent] = useState<Content>("wishlist");

  function addToWishlist(product: FaunaProduct) {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  }

  function removeFromWishList(productID: string) {
    const newWishlist = wishlist.filter((item) => item.id !== productID);

    setWishlist(newWishlist);
  }

  function handleWishListContent(curent: Content) {
    console.log(curent)
    setWislistContent(curent);
  }

  return (
    <WishlistContext.Provider
      value={{
        handleWishListContent,
        wislistContent,
        wishlist,
        addToWishlist,
        wishlistQuantity: wishlist.length,
        removeFromWishList,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export function useWishlist() {
  return useContext(WishlistContext);
}
