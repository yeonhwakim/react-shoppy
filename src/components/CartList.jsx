import React from "react";

import CartItem from "../components/CartItem";

function ProductList({
  products,
  decrementProduct,
  incrementProduct,
  removeProduct,
}) {
  return (
    <ul>
      {products &&
        products.map((product, index) => (
          <CartItem
            key={index}
            index={index}
            product={product}
            decrementProduct={decrementProduct}
            incrementProduct={incrementProduct}
            removeProduct={removeProduct}
          />
        ))}
    </ul>
  );
}

export default ProductList;
