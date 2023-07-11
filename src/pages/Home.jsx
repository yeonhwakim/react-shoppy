import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../api/firebase";

import ProductList from "../components/ProductList";

function Home() {
  const navigate = useNavigate();

  const [products, setProduct] = useState([]);

  useEffect(() => {
    getProducts().then((products) => {
      setProduct(products);
    });
  }, []);

  const handleClickProduct = (id) => {
    navigate("/product/" + id);
  };

  return (
    <div>
      <div className="w-full bg-black px-2 py-10 text-white flex flex-col items-center">
        <p className="text-white font-bold text-2xl mb-2">OPENING SALE!</p>
        <p className="text-white">2023.06.01~2023.06.30</p>
      </div>
      <ProductList
        products={products}
        handleClickProduct={handleClickProduct}
      />
    </div>
  );
}

export default Home;
