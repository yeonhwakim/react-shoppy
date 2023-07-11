import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../api/firebase";

import ProductList from "../components/ProductList";

function Products() {
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
    <ProductList products={products} handleClickProduct={handleClickProduct} />
  );
}

export default Products;
