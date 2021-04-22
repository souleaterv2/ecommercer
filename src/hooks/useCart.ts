import { useEffect, useReducer } from "react";
import Cookies from "js-cookie";

import { Product, Cart } from "../@Types";
import { cartReducer, inicialState } from "../reducer/cartReducer";

import { fetchStock } from "../util/checkStock";
import { covertToCart } from "../util/convert";

interface CartInfo {
  customerId?: string | null;
  email?: string | null;
  createdAt?: string | null;
  currency?: string | null;
}

export interface Setting {
  addToCart: (product: Product) => Promise<boolean>;
  removeFromCart: (product: string) => Promise<void>;
  addQuantityToItem: (productId: string, quantity: number) => Promise<boolean>;
  setCartInfo: (cartInfo: CartInfo) => void;
  clearCart: () => void;
}

type CartReturn = [Cart, Setting];

export function useCart(): CartReturn {
  const [state, dispatch] = useReducer(cartReducer, inicialState);

  useEffect(() => {
    const state = Cookies.getJSON("StylesUP:cart");
    if (state) {
      console.log("Cookie =>", state);
      dispatch({ type: "RESET_CART_STATE", payload: state });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_TOTAL_PRICE" });
    dispatch({ type: "SET_TOTAL_OF_INTENS_ON_CART" });
  }, [state.cartItens]);

  async function addToCart(product: Product) {
    if (!state.cartItens.some((item) => item.id === product.id)) {
      const haveInStock = await fetchStock({ id: product.id });

      if (haveInStock) {
        dispatch({
          type: "SET_CART_ITENS",
          payload: { cartIten: covertToCart(product) },
        });
        return false;
      }

      throw new Error("Ordered item out of stock");
    }
    return true;
  }

  async function removeFromCart(productId: string) {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id: productId } });
  }

  async function addQuantityToItem(productId: string, quantity: number) {
    const cartItem = state.cartItens.find((item) => item.id === productId);
    if (cartItem) {
      if (cartItem.quantity > quantity) {
        dispatch({
          type: "ADD_QUANTITY_TO_ITEM",
          payload: { id: productId, quantity },
        });
        return true;
      }

      const haveInStock = await fetchStock({ id: productId, quantity });
      if (haveInStock) {
        dispatch({
          type: "ADD_QUANTITY_TO_ITEM",
          payload: { id: productId, quantity },
        });
        return true;
      }

      return false;
    }
  }

  function clearCart() {
    dispatch({ type: "RESET_CART_ITENS" });
  }

  function setCartInfo(
    cartInfo: CartInfo = {
      createdAt: null,
      currency: null,
      customerId: null,
      email: null,
    }
  ) {
    if (cartInfo.createdAt) {
      dispatch({
        type: "SET_CREATED_AT",
        payload: { createdAt: cartInfo.createdAt },
      });
    }

    if (cartInfo.currency) {
      dispatch({
        type: "SET_CURRENCY",
        payload: { currency: cartInfo.currency },
      });
    }

    if (cartInfo.email) {
      dispatch({
        type: "SET_EMAIL",
        payload: { email: cartInfo.email },
      });
    }

    if (cartInfo.customerId) {
      dispatch({
        type: "SET_CUSTOMER_ID",
        payload: { customerId: cartInfo.customerId },
      });
    }
  }

  const data: Setting = {
    clearCart,
    addQuantityToItem,
    addToCart,
    removeFromCart,
    setCartInfo,
  };

  return [state, data];
}
