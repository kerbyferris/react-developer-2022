import { createContext, useState, useEffect } from "react";
import PRODUCTS from "../shop-data.json";
// import { createProductDocument } from "../utils/firebase/firebase.utils";

export const ProductsContext = createContext({});

export const ProductsProvider = ({ children }) => {
  const [products] = useState(PRODUCTS);
  const value = { products };

  // useEffect(() => {
  //   PRODUCTS.map((product) => createProductDocument(product));
  // }, []);

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
};
