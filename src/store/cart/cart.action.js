import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setCartItems = (cartItems) => {
  console.log(cartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems);
};

export const setShowCart = (showCart) =>
  createAction(CART_ACTION_TYPES.SET_SHOW_CART, showCart);

export const addItemToCart = (item, cartItems) => {
  const addCartItem = (product, cartItems) => {
    const productExistsInCart = cartItems.find(
      (item) => item.id === product.id
    );

    if (productExistsInCart) {
      return cartItems.map((item) =>
        item.id === product.id
          ? { ...product, quantity: item.quantity + 1 }
          : item
      );
    }

    return [...cartItems, { ...product, quantity: 1 }];
  };

  const newCartItems = addCartItem(item, cartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (item, cartItems) => {
  const newCartItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const incrementCartItemQuantity = (item, cartItems) => {
  const incrementQuantity = (item, cartItems) =>
    cartItems.map((cartItem) =>
      item.id === cartItem.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

  const newCartItems = incrementQuantity(item, cartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const decrementCartItemQuantity = (item, cartItems) => {
  const decrementQuantity = (item, cartItems) =>
    cartItems.map((cartItem) => {
      if (item.id === cartItem.id) {
        return cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : { ...cartItem, quantity: 1 };
      }
      return cartItem;
    });
  const newCartItems = decrementQuantity(item, cartItems);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
