import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartCount: 0,
  cartPrice: 0,
  setCartPrice: () => {},
});

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
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartPrice, setCartPrice] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, item) => item.quantity + acc,
      0
    );

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartPrice = cartItems.reduce(
      (acc, item) => item.price * item.quantity + acc,
      0
    );

    setCartPrice(newCartPrice);
  }, [cartItems]);

  const addItemToCart = (item) => {
    setCartItems(addCartItem(item, cartItems));
  };

  const removeItemFromCart = (item) => {
    setCartItems(removeCartItem(item, cartItems));
  };

  const incrementCartItemQuantity = (item) => {
    setCartItems(incrementQuantity(item, cartItems));
  };

  const decrementCartItemQuantity = (item) => {
    setCartItems(decrementQuantity(item, cartItems));
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
