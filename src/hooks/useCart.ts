import { useEffect, useReducer } from "react";
import Cookies from "js-cookie";

import { Product, Cart } from "../@Types";
import { cartReducer, inicialState } from "../reducer/cartReducer";

import { fetchStock } from "../util/checkStock";
import { covertToCart } from "../util/convert";
import { useToast } from "@chakra-ui/toast";

export interface Setting {
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (product: string) => Promise<void>;
  addQuantityToItem: (productId: string, quantity: number) => Promise<boolean>;
  clearCart: () => void;
  CheckIsInCar: (productId: string) => boolean;
}

type CartReturn = [Cart, Setting];

export function useCart(): CartReturn {
  const [state, dispatch] = useReducer(cartReducer, inicialState);
  const toast = useToast();

  useEffect(() => {
    const state = Cookies.getJSON(`StylesUP:cart`);
    if (state) {
      dispatch({ type: "RESET_CART_STATE", payload: state });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: "SET_TOTAL_PRICE" });
    dispatch({ type: "SET_TOTAL_OF_INTENS_ON_CART" });
  }, [state.cartItens]);

  function CheckIsInCar(productId: string): boolean {
    return state.cartItens.some((item) => item.id === productId);
  }

  async function addToCart(product: Product) {
    if (!state.cartItens.some((item) => item.id === product.id)) {
      const haveInStock = await fetchStock({ id: product.id });

      if (haveInStock) {
        dispatch({
          type: "SET_CART_ITENS",
          payload: { cartIten: covertToCart(product) },
        });
        return;
      }
      toast({
        title: "Cart",
        description: "Out of stock",
        status: "error",
        isClosable: true,
        duration: 3000,
      });
    }
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

  function addDiscount(percent: number) {
    dispatch({ type: "SET_DISCOUNTS", payload: { discount: percent } });
  }

  const data: Setting = {
    CheckIsInCar,
    clearCart,
    addQuantityToItem,
    addToCart,
    removeFromCart,
  };

  return [state, data];
}
