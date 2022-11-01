import { ReactComponent as ShoppingIcon } from "../assets/shopping-bag.svg";
import { useDispatch, useSelector } from "react-redux";

import { setShowCart } from "../store/cart/cart.action";
import { selectCartCount, selectShowCart } from "../store/cart/cart.selector";

import "./cart-icon.styles.scss";

const CartIcon = () => {
  const dispatch = useDispatch();

  const showCart = useSelector(selectShowCart);
  const cartCount = useSelector(selectCartCount);

  const toggleShowCart = () => dispatch(setShowCart(!showCart));

  return (
    <div className="cart-icon-container" onClick={toggleShowCart}>
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartCount}</span>
    </div>
  );
};

export default CartIcon;
