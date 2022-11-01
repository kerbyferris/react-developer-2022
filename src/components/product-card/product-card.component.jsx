import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import Button from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const addToCartHandler = () => dispatch(addItemToCart(product, cartItems));

  const { name, imageUrl, price } = product;
  return (
    <div className="product-card-container">
      <img alt={`name`} src={imageUrl} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">${price}</span>
      </div>
      <Button buttonType="inverted" onClick={addToCartHandler}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
