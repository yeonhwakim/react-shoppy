import React, { useEffect, useState } from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { LuEqual } from "react-icons/lu";

import { useFirebase } from "../context/LoginContext";

import { getProductInCart, removeCart, addCart } from "../api/firebase";

import CartList from "../components/CartList";
import PriceBox from "../components/PriceBox";
import Button from "../components/Button";
import Title from "../components/Title";

function Cart() {
  const {
    user: { email },
  } = useFirebase();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getProductInCart({ email }).then((cart) => {
      cart.forEach((cartProducts) => {
        Object.values(cartProducts).forEach((product) => {
          const { price, count } = product;
          setProducts((prev) => [...prev, product]);
          setTotalPrice((prev) => prev + +price * +count);
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
      email,
      product: {
        ...product,
        count: product.count + 1,
      },
    });

    setTotalPrice((prev) => prev + +product.price);
  };

  const decrementProduct = async (idx) => {
    await setProducts((prev) =>
      prev.map((item, index) =>
        idx === index ? { ...item, count: item.count - 1 } : item
      )
    );

    const product = products[idx];
    const { count, price } = product;

    if (count - 1 < 1) {
      await removeCart({
        email,
        product,
      });
      setTotalPrice((prev) => prev - +price);

      return;
    }

    await addCart({
      email,
      product: {
        ...product,
        count: count - 1,
      },
    });

    setTotalPrice((prev) => prev - +price);
  };

  const removeProduct = async (idx) => {
    await setProducts((prev) => prev.filter((_, index) => index !== idx));

    const product = products[idx];
    const { count, price } = product;

    await removeCart({
      email,
      product,
    });

    setTotalPrice((prev) => prev - +price * +count);
  };

  return (
    <div className="px-4">
      <Title title={"장바구니"} />
      <div className="px-4 pt-4 pb-1">
        <CartList
          products={products}
          incrementProduct={incrementProduct}
          decrementProduct={decrementProduct}
          removeProduct={removeProduct}
        />
      </div>
      <div className="flex flex-row items-center w-full justify-evenly py-6">
        <PriceBox title={"상품총액"} price={totalPrice} />
        <div>
          <AiOutlinePlusCircle className="w-6 h-6" />
        </div>
        <PriceBox title={"배송비"} price={3000} />
        <div>
          <LuEqual className="w-6 h-6" />
        </div>
        <PriceBox title={"총가격"} price={totalPrice + 3000} />
      </div>
      <Button title={"주문하기"} />
    </div>
  );
}

export default Cart;
