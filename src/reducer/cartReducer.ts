import Cookies from "js-cookie";
import { Cart, CartItem, Discount } from "../@Types";
import { fetchStock } from "../util/checkStock";

export const inicialState: Cart = {
  cartItens: [],
  discounts: [],
  carItensSubTotalPrice: 0,
  totalItensOnCart: 0,
  totalPrice: 0,
};

type ActionTypes =
  | { type: "SET_DISCOUNTS"; payload: { discount: number } }
  | {
      type: "SET_CART_ITENS_SUB_TOTAL_PRICE";
      payload: { cartItensSubTotalPrice: number };
    }
  | { type: "SET_CART_ITENS"; payload: { cartIten: CartItem } }
  | { type: "REMOVE_FROM_CART"; payload: { id: string } }
  | { type: "ADD_QUANTITY_TO_ITEM"; payload: { id: string; quantity: number } }
  | { type: "RESET_CART_STATE"; payload: Cart }
  | { type: "RESET_CART_ITENS" }
  | { type: "SET_TOTAL_OF_INTENS_ON_CART" }
  | { type: "SET_TOTAL_PRICE" };

export function cartReducer(state: Cart, action: ActionTypes): Cart {
  function doAction(): Cart {
    switch (action.type) {
      case "SET_TOTAL_PRICE": {
        let totalPrice = state.cartItens.reduce((total, item) => {
          return (total += item.price * item.quantity);
        }, 0);

        const totalOfDiscounts = state.discounts.reduce((total, item) => {
          return (total += item);
        }, 0);

        if (totalOfDiscounts > 0) {
          totalPrice *= totalOfDiscounts;
        }

        return { ...state, totalPrice };
      }

      case "SET_DISCOUNTS": {
        const discount = action.payload.discount / 100;

        return {
          ...state,
          discounts: [...state.discounts, discount],
        };
      }

      case "SET_CART_ITENS_SUB_TOTAL_PRICE": {
        return {
          ...state,
          carItensSubTotalPrice: action.payload.cartItensSubTotalPrice,
        };
      }

      case "SET_CART_ITENS": {
        return {
          ...state,
          cartItens: [...state.cartItens, action.payload.cartIten],
        };
      }

      case "REMOVE_FROM_CART": {
        const newCart = state.cartItens.filter(
          (item) => item.id !== action.payload.id
        );
        return { ...state, cartItens: newCart };
      }

      case "ADD_QUANTITY_TO_ITEM": {
        const handInStock = fetchStock({
          id: action.payload.id,
          quantity: action.payload.quantity,
        });
        if (handInStock) {
          const newCart = state.cartItens.map((item) => {
            if (item.id === action.payload.id) {
              item.quantity = action.payload.quantity;
            }
            return item;
          });

          return { ...state, cartItens: newCart };
        }
        return state;
      }

      case "RESET_CART_STATE": {
        return { ...action.payload };
      }

      case "SET_TOTAL_OF_INTENS_ON_CART": {
        return { ...state, totalItensOnCart: state.cartItens.length };
      }

      case "RESET_CART_ITENS": {
        return { ...state, cartItens: [] };
      }

      default: {
        return state;
      }
    }
  }

  const newState = doAction();

  Cookies.set(`StylesUP:cart`, newState, {
    path: "/",
    expires: 30,
  });

  return newState;
}
