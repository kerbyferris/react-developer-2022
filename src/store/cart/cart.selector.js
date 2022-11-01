import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectShowCart = createSelector(
  [selectCartReducer],
  (cart) => cart.showCart
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, item) => item.quantity + acc, 0)
);

export const selectCartPrice = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((acc, item) => item.price * item.quantity + acc, 0)
);
