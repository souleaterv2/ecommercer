import { Cart, CartItem, Discount } from "../@Types";
import { fetchStock } from "../util/checkStock";

export const inicialState: Cart = {
  customerId: "",
  email: "",
  createdAt: "",
  currency: "",
  cartItens: [],
  discounts: [],
  carItensSubTotalPrice: 0,
  totalItensOnCart: 0,
  totalPrice: 0,
};

type ActionTypes =
  | { type: "SET_CUSTOMER_ID"; payload: { customerId: string } }
  | { type: "SET_EMAIL"; payload: { email: string } }
  | { type: "SET_CREATED_AT"; payload: { createdAt: string } }
  | { type: "SET_CURRENCY"; payload: { currency: string } }
  | { type: "SET_DISCOUNTS"; payload: { discount: Discount } }
  | {
      type: "SET_CART_ITENS_SUB_TOTAL_PRICE";
      payload: { cartItensSubTotalPrice: number };
    }
  | { type: "SET_CART_ITENS"; payload: { cartIten: CartItem } }
  | { type: "REMOVE_FROM_CART"; payload: { id: string } }
  | { type: "ADD_QUANTITY_TO_ITEM"; payload: { id: string; quantity: number } }
  | { type: "RELOAD_CART"; payload: Cart }
  | { type: "SET_TOTAL_OF_INTENS_ON_CART" }
  | { type: "SET_TOTAL_PRICE" };

export function cartReducer(state: Cart, action: ActionTypes): Cart {
  switch (action.type) {
    case "SET_CUSTOMER_ID": {
      return { ...state, customerId: action.payload.customerId };
    }
    case "SET_EMAIL": {
      return { ...state, email: action.payload.email };
    }
    case "SET_TOTAL_PRICE": {
      const price = state.cartItens.reduce((total, item) => {
        return (total += item.price * item.quantity);
      }, 0);

      const totalOfDiscounts = state.discounts.reduce((total, item) => {
        return (total += item.value);
      }, 0);

      const totalPrice = price * totalOfDiscounts;

      return { ...state, totalPrice };
    }
    case "SET_DISCOUNTS": {
      return {
        ...state,
        discounts: [...state.discounts, action.payload.discount],
      };
    }
    case "SET_CART_ITENS_SUB_TOTAL_PRICE": {
      return {
        ...state,
        carItensSubTotalPrice: action.payload.cartItensSubTotalPrice,
      };
    }
    case "SET_CURRENCY": {
      return { ...state, currency: action.payload.currency };
    }
    case "SET_CART_ITENS": {
      console.log("SET_CART_ITENS =>", action.payload.cartIten);
      return {
        ...state,
        cartItens: [...state.cartItens, action.payload.cartIten],
      };
    }
    case "SET_CREATED_AT": {
      return { ...state, createdAt: action.payload.createdAt };
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
    case "RELOAD_CART": {
      return { ...action.payload };
    }
    case "SET_TOTAL_OF_INTENS_ON_CART": {
      return { ...state, totalItensOnCart: state.cartItens.length };
    }
    default: {
      return state;
    }
  }
}
