import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import Cookies from "js-cookie";
import { FaunaProduct, FaunaStock } from "../@Types";
import { api } from "../services/api";
import { formatPrice } from "../util/formatPrice";
import { useToast } from "@chakra-ui/toast";

interface CartItem extends FaunaProduct {
  quantity: number;
}

type CheckoutCartData = {
  price: string;
  quantity: number;
};

interface CalcCartPriceOptions {
  converted?: boolean;
  discount?: number;
}
interface CartContextData {
  cart: CartItem[];
  addToCar: (product: FaunaProduct) => Promise<void>;
  cartQuantity: number;
  calcCartPrice: () => string | number;
  removeFromCart: (productID: string) => void;
  addProductQuanty: (productID: string, quantity: number) => Promise<void>;
  convertCartToCheckout: () => CheckoutCartData[];
  addDiscount: (percent: number) => void;
}

const CartContext = createContext({} as CartContextData);

export const CartContextProvider: React.FC = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const cartData = Cookies.getJSON("StylesUP:cart");
    if (cartData) {
      return cartData;
    }

    return [];
  });
  const [discount, setDiscount] = useState(0);
  const toast = useToast();

  useEffect(() => {
    Cookies.set("StylesUP:cart", cart, { expires: 31, path: "/" });
  }, [cart]);

  function calcCartPrice() {
    let total = cart.reduce((acc, cartIem) => {
      return (acc += cartIem.price.value * cartIem.quantity);
    }, 0);

    if (discount > 0) {
      total = total * (discount / 100);
    }

    const priveConverted = formatPrice(total);
    return priveConverted;
  }

  function updateQuantity(productID: string, quantity: number) {
    const newCart = cart.map((item) => {
      if (item.id === productID) {
        item.quantity = quantity;
      }
      return item;
    });
    setCart(newCart);
  }

  async function addProductQuanty(productID: string, quantity: number) {
    if (quantity <= 0) {
      return;
    }

    const cartItem = cart.find((item) => item.id === productID);

    if (!cartItem) {
      return;
    }

    if (cartItem.quantity > quantity) {
      updateQuantity(productID, quantity);
      return;
    }

    try {
      const stock = (
        await api.post<FaunaStock>("/cart", {
          productID,
        })
      ).data;

      if (stock.quantity > quantity) {
        updateQuantity(productID, quantity);
        return;
      }

      throw new Error("Ordered quantity out of stock.");
    } catch (error) {
      toast({
        title: "Cart",
        description: error.message,
        duration: 3000,
        isClosable: true,
        status: "warning",
      });
    }
  }

  async function addToCar(product: FaunaProduct) {
    const isProductInCart = cart.find((cartItem) => cartItem.id === product.id);
    if (!isProductInCart) {
      const stock = (
        await api.post<FaunaStock>("/cart", {
          productID: product.id,
        })
      ).data;

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

  function convertCartToCheckout(): CheckoutCartData[] {
    const cartCoverted = cart.map((item) => {
      return {
        price: item.price.stripeId,
        quantity: item.quantity,
      };
    });

    return cartCoverted;
  }

  function addDiscount(percent: number) {
    setDiscount(percent);
  }

  return (
    <CartContext.Provider
      value={{
        convertCartToCheckout,
        cart,
        addDiscount,
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

export function useCart(): CartContextData {
  return useContext(CartContext);
}
