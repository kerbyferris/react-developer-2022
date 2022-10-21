import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import Button from "../button/button.component";
import "./product-card.styles.scss";

const ProductCard = ({ product }) => {
  const { addItemToCart } = useContext(CartContext);
  const addToCartHandler = () => addItemToCart(product);

  const { name, imageUrl, price } = product;
  return (
    <div className="product-card-container">
      <img alt={`name`} src={imageUrl} />
      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button buttonType="inverted" onClick={addToCartHandler}>
        Add to Cart
      </Button>
    </div>
  );
};

export default ProductCard;
