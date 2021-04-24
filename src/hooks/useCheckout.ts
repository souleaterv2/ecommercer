import { useReducer } from "react";
import { checkoutReducer, inicialState } from "../reducer/CheckoutReducer";

export function useCheckout() {
  const [state, dispatch] = useReducer(checkoutReducer, inicialState);
}
