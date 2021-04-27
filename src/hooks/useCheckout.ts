import { useReducer } from "react";
import { checkoutReducer, inicialState } from "../reducer/CheckoutReducer";
import { CartItem } from "../@Types";

export function useCheckout() {
  const [state, dispatch] = useReducer(checkoutReducer, inicialState);

  function procedToCheckout(cartItens: CartItem[]) {
    dispatch({ type: "SET_IS_LOADING", payload: true });
  }
}
