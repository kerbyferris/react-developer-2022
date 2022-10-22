import { Fragment, useContext } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import { CategoriesContext } from "../../contexts/categories.context";

import "./shop.styles.scss";

const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <Fragment>
      {Object.keys(categoriesMap).map((categoryName) => (
        <Fragment key={categoryName}>
          <h2>{categoryName}</h2>
          <div className="products-container">
            {categoriesMap[categoryName].map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default Shop;
