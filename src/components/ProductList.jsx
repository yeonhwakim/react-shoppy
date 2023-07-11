import React from "react";

import ProductItem from "../components/ProductItem";

function ProductList({ products, handleClickProduct }) {
  return (
    <ul className="p-4 grid grid-cols-4 gap-4">
      {products &&
        products.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            handleClickProduct={handleClickProduct}
          />
        ))}
    </ul>
  );
}

export default ProductList;
