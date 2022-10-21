import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
  showCart: false,
  setShowCart: () => {},
  cartItems: [],
  setCartItems: () => {},
  cartCount: 0,
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

export const CartProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState([]);

  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (acc, item) => item.quantity + acc,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (product) => {
    setCartItems(addCartItem(product, cartItems));
  };
  const value = { showCart, setShowCart, cartItems, addItemToCart, cartCount };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
