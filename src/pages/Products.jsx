import React from "react";
import { useNavigate } from "react-router-dom";

import useProducts from "../hooks/useProducts";

import ProductList from "../components/ProductList";

function Products() {
  const navigate = useNavigate();
  const { productsQuery } = useProducts();

  const { isLoading, error, data: products } = productsQuery;

  const handleClickProduct = (id, product) => {
    navigate("/product/" + id, { state: { product } });
  };

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {products && (
        <ProductList
          products={products}
          handleClickProduct={handleClickProduct}
        />
      )}
    </>
  );
}

export default Products;
