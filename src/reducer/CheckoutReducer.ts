export interface CheckoutState {
  isLoading: boolean;
  isCouponValid: boolean;
}

export const inicialState: CheckoutState = {
  isLoading: false,
  isCouponValid: false,
};

type ActionTypes =
  | { type: "SET_IS_LOADING"; payload: boolean }
  | { type: "SET_IS_COUPON_VALID"; payload: boolean }
  | { type: "START_CHECKOUT" };

export function checkoutReducer(
  state: CheckoutState,
  action: ActionTypes
): CheckoutState {
  switch (action.type) {
    case "SET_IS_LOADING": {
      return {
        ...state,
        isLoading: action.payload,
      };
    }
  }
}
