import React, { useEffect, useState } from "react";

import { useFirebase } from "../context/LoginContext";

import { getProductInCart } from "../api/firebase";

function Cart() {
  const { userEmail } = useFirebase();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProductInCart({ userEmail }).then((cart) => {
      cart.forEach((cartProducts) => {
        Object.values(cartProducts).forEach((product) => {
          setProducts((prev) => [...prev, product]);
        });
      });
    });
  }, []);

  return (
    <div>
      <div>내 장바구니</div>
      <div>
        <ul>
          {products &&
            products.map(({ image, name, selectOption, price, count }) => (
              <li>
                <div>
                  <img src={image} alt="" />
                  <div>
                    <p>{name}</p>
                    <p>{selectOption}</p>
                    <p>{price}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <button>+</button>
                    <span>{count}</span>
                    <button>-</button>
                  </div>
                  <button></button>
                </div>
              </li>
            ))}
        </ul>
      </div>
      <div>
        <div>
          <span>상품총액</span>
          <span>₩3000</span>
        </div>
        <div>+</div>
        <div>
          <span>배송비</span>
          <span>₩3000</span>
        </div>
        <div>=</div>
        <div>
          <span>총가격</span>
          <span>₩6000</span>
        </div>
      </div>
      <button>주문하기</button>
    </div>
  );
}

export default Cart;
