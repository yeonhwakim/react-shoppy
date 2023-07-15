import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { getProducts } from "../api/firebase";

import ProductList from "../components/ProductList";

function Products() {
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: products,
  } = useQuery(["products"], getProducts);

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
