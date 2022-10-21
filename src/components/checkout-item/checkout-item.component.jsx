import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

const CheckoutItem = ({ item }) => {
  const { name, imageUrl, price, quantity } = item;
  const {
    decrementCartItemQuantity,
    incrementCartItemQuantity,
    removeItemFromCart,
  } = useContext(CartContext);

  const decQuantityHandler = () => decrementCartItemQuantity(item);
  const incQuantityHandler = () => incrementCartItemQuantity(item);
  const removeFromCartHandler = () => removeItemFromCart(item);

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img alt={name} src={imageUrl} />
      </div>
      <span className="name"> {name} </span>
      <span className="quantity">
        <div className="arrow" onClick={decQuantityHandler}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={incQuantityHandler}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={removeFromCartHandler}>
        &#10005;
      </div>
    </div>
  );
};

export default CheckoutItem;
