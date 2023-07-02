import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getProducts } from "../api/firebase";

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
    <ul className="p-4 grid grid-cols-4 gap-4">
      {products &&
        products.map(({ id, image, name, price, category }) => (
          <li
            className="rounded-md flex flex-col items-center shadow-xl overflow-hidden"
            key={id}
            onClick={() => handleClickProduct(id)}
          >
            <img className="w-50" src={image} alt={`${name} 이미지`} />
            <div className="w-full p-2">
              <div className="flex flex-row justify-between">
                <span className="text-base font-bold">{name}</span>
                <span className="text-base font-bold">₩{price}</span>
              </div>
              <div>
                <span className="text-sm font-semibold text-gray-500">
                  {category}
                </span>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default Products;
