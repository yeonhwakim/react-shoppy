import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getProduct } from "../api/firebase";

function Product() {
  const { id } = useParams();

  const [product, setProduct] = useState({});
  const { category, description, image, name, option, price } = product;

  useEffect(() => {
    getProduct({ id }).then((product) => {
      setProduct(product);
    });
  }, []);

  return (
    product && (
      <div>
        <div>{`>${category}`}</div>
        <div>
          <img src={image} alt={`${name} 이미지`} />
          <div>
            <div>
              <span>{name}</span>
              <span>₩{price}</span>
            </div>
            <p>{description}</p>
            <div>
              <span>옵션 :</span>
              <select name="" id="">
                {option &&
                  option.split(",").map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            <button>장바구니에 추가</button>
          </div>
        </div>
      </div>
    )
  );
}

export default Product;
