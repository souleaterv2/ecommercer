import { createContext, useContext } from "react";
import { Cart } from "../@Types";
import { useCart, Setting } from "../hooks/useCart";

interface CartContextData extends Setting {
  cartState: Cart;
}

const CartContex = createContext<CartContextData>({} as CartContextData);

export const CartProvider: React.FC = ({ children }) => {
  const [cartState, functions] = useCart();

  return (
    <CartContex.Provider
      value={{
        cartState,
        ...functions,
      }}
    >
      {children}
    </CartContex.Provider>
  );
};

export function useCartContext(): CartContextData {
  return useContext(CartContex);
}
