import React from "react";
import { useNavigate } from "react-router-dom";

import useProducts from "../hooks/useProducts";

import ProductList from "../components/ProductList";

function Home() {
  const navigate = useNavigate();
  const { productsQuery } = useProducts();

  const { isLoading, error, data: products } = productsQuery;

  const handleClickProduct = (id, product) => {
    navigate("/product/" + id, { state: { product } });
  };

  return (
    <div>
      <div className="w-full bg-black px-2 py-10 text-white flex flex-col items-center">
        <p className="text-white font-bold text-2xl mb-2">OPENING SALE!</p>
        <p className="text-white">2023.06.01~2023.06.30</p>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {products && (
        <ProductList
          products={products}
          handleClickProduct={handleClickProduct}
        />
      )}
    </div>
  );
}

export default Home;
