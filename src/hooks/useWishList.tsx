import { createContext, useContext, useState } from "react";
import { FaunaProduct } from "../@Types";

interface WishlistData {
  wishlist: FaunaProduct[];
  wishlistQuantity: number;
  addToWishlist: (product: FaunaProduct) => void;
  removeFromWishList: (productID: string) => void;
}

const WishlistContext = createContext({} as WishlistData);

export const WishlistContextProvider: React.FC = ({ children }) => {
  const [wishlist, setWishlist] = useState<FaunaProduct[]>([]);

  function addToWishlist(product: FaunaProduct) {
    if (!wishlist.some((item) => item.id === product.id)) {
      setWishlist([...wishlist, product]);
    }
  }

  function removeFromWishList(productID: string) {
    const newWishlist = wishlist.filter((item) => item.id !== productID);

    setWishlist(newWishlist);
  }

  return (
    <WishlistContext.Provider
      value={{
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
