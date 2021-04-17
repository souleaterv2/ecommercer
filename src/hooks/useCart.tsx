import { useContext, useState } from "react";
import { createContext } from "react";

import { FaunaProduct, FaunaStock } from "../@Types";
import { api } from "../services/api";
import { formatPrice } from "../util/formatPrice";

interface CartItem extends FaunaProduct {
  quantity: number;
}

interface CartContextData {
  cart: CartItem[];
  addToCar: (product: FaunaProduct) => Promise<void>;
  cartQuantity: number;
  calcCartPrice: () => string;
  removeFromCart: (productID: string) => void;
  addProductQuanty: (productID: string, quantity: number) => Promise<void>;
}

const CartContext = createContext({} as CartContextData);

export const CartContextProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  function calcCartPrice() {
    const total = cart.reduce((acc, cartIem) => {
      return (acc += cartIem.price.value * cartIem.quantity);
    }, 0);
    const priveConverted = formatPrice(total);

    return priveConverted;
  }

  async function addProductQuanty(productID: string, quantity: number) {
    if (quantity <= 0) {
      return;
    }

    try {
      const stock = (
        await api.post<FaunaStock>("/cart", {
          productID,
        })
      ).data;

      if (cart.some((item) => item.id === productID)) {
        if (stock.quantity > quantity) {
          const newCart = cart.map((item) => {
            if (item.id === productID) {
              item.quantity++;
            }
            return item;
          });
          setCart(newCart);
          return;
        }

        throw new Error("Ordered quantity out of stock.");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async function addToCar(product: FaunaProduct) {
    const isProductInCart = cart.find((cartItem) => cartItem.id === product.id);
    console.log("isProdct", isProductInCart);
    if (!isProductInCart) {
      const stock = (
        await api.post<FaunaStock>("/cart", {
          productID: product.id,
        })
      ).data;
      console.log(stock);

      if (stock.quantity > 0) {
        setCart([...cart, { ...product, quantity: 1 }]);
        return;
      }
    }
  }

  function removeFromCart(productID: string) {
    if (cart.some((cartItem) => cartItem.id === productID)) {
      const newCart = cart.filter((carItem) => carItem.id !== productID);
      setCart(newCart);
      return;
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        cartQuantity: cart.length,
        addToCar,
        calcCartPrice,
        removeFromCart,
        addProductQuanty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
