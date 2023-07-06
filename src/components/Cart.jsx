import React, { useEffect, useState } from "react";

import { useFirebase } from "../context/LoginContext";

import { getProductInCart, removeCart, addCart } from "../api/firebase";

function Cart() {
  const { userEmail } = useFirebase();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getProductInCart({ userEmail }).then((cart) => {
      cart.forEach((cartProducts) => {
        Object.values(cartProducts).forEach((product) => {
          setProducts((prev) => [...prev, product]);
          setTotalPrice((prev) => prev + +product.price);
        });
      });
    });
  }, []);

  const incrementProduct = async (idx) => {
    await setProducts((prev) =>
      prev.map((item, index) =>
        idx === index ? { ...item, count: item.count + 1 } : item
      )
    );

    const product = products[idx];

    await addCart({
      userEmail,
      product: {
        ...product,
        count: product.count + 1,
      },
    });

    await setTotalPrice((prev) => prev + +product.price);
  };

  return (
    <div>
      <div>내 장바구니</div>
      <div>
        <ul>
          {products &&
            products.map(
              ({ image, name, selectOption, price, count }, index) => (
                <li key={index}>
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
                      <button>-</button>
                      <span>{count}</span>
                      <button onClick={() => incrementProduct(index)}>+</button>
                    </div>
                    <button></button>
                  </div>
                </li>
              )
            )}
        </ul>
      </div>
      <div>
        <div>
          <span>상품총액</span>
          <span>{`₩${totalPrice}`}</span>
        </div>
        <div>+</div>
        <div>
          <span>배송비</span>
          <span>₩3000</span>
        </div>
        <div>=</div>
        <div>
          <span>총가격</span>
          <span>{`₩${totalPrice + 3000}`}</span>
        </div>
      </div>
      <button>주문하기</button>
    </div>
  );
}

export default Cart;
