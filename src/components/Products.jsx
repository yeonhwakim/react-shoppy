import React, { useEffect, useState } from "react";
import { getProducts } from "../api/firebase";

function Products() {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProduct(products);
    });
  }, []);

  return (
    <ul>
      {products &&
        products.map(({ id, image, name, price, category }) => (
          <li key={id}>
            <img src={image} alt={`${name} 이미지`} />
            <div>
              <span>{name}</span>
              <span>{price}</span>
            </div>
            <div>
              <span>{category}</span>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default Products;
