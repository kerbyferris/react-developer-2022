import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

export const CartContext = createContext({
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartCount: 0,
  cartPrice: 0,
  setCartPrice: () => {},
});

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_SHOW_CART: "SET_SHOW_CART",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_CART_ITEMS":
      return {
        ...state,
        ...payload,
      };
    case "SET_SHOW_CART":
      return {
        ...state,
        showCart: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
};

const INITIAL_STATE = {
  showCart: false,
  cartItems: [],
  cartCount: 0,
  cartPrice: 0,
};

const addCartItem = (product, cartItems) => {
  const productExistsInCart = cartItems.find((item) => item.id === product.id);

  if (productExistsInCart) {
    return cartItems.map((item) =>
      item.id === product.id
        ? { ...product, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cartItems, { ...product, quantity: 1 }];
};

const incrementQuantity = (item, cartItems) =>
  cartItems.map((cartItem) =>
    item.id === cartItem.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
  );

const decrementQuantity = (item, cartItems) =>
  cartItems.map((cartItem) => {
    if (item.id === cartItem.id) {
      return cartItem.quantity > 1
        ? { ...cartItem, quantity: cartItem.quantity - 1 }
        : { ...cartItem, quantity: 1 };
    }
    return cartItem;
  });

const removeCartItem = (item, cartItems) =>
  cartItems.filter((cartItem) => cartItem.id !== item.id);

export const CartProvider = ({ children }) => {
  const [{ showCart, cartItems, cartCount, cartPrice }, dispatch] = useReducer(
    cartReducer,
    INITIAL_STATE
  );

  const updateCartItemsReducer = (cartItems) => {
    const cartCount = cartItems.reduce((acc, item) => item.quantity + acc, 0);

    const cartPrice = cartItems.reduce(
      (acc, item) => item.price * item.quantity + acc,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartCount,
        cartPrice,
        cartItems,
      })
    );
  };

  const addItemToCart = (item) => {
    const newCartItems = addCartItem(item, cartItems);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (item) => {
    const newCartItems = removeCartItem(item, cartItems);
    updateCartItemsReducer(newCartItems);
  };

  const incrementCartItemQuantity = (item) => {
    const newCartItems = incrementQuantity(item, cartItems);
    updateCartItemsReducer(newCartItems);
  };

  const decrementCartItemQuantity = (item) => {
    const newCartItems = decrementQuantity(item, cartItems);
    updateCartItemsReducer(newCartItems);
  };

  const setShowCart = (showCart) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_SHOW_CART, showCart));
  };

  const value = {
    addItemToCart,
    cartCount,
    cartItems,
    cartPrice,
    decrementCartItemQuantity,
    incrementCartItemQuantity,
    removeItemFromCart,
    setShowCart,
    showCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
