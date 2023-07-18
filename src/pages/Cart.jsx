import React from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { LuEqual } from "react-icons/lu";

import useCart from "../hooks/useCart";

import CartList from "../components/CartList";
import PriceBox from "../components/PriceBox";
import Button from "../components/Button";
import Title from "../components/Title";

const SHIPPING = 3000;

function Cart() {
  const {
    cartQuery: { isLoading, data: products },
    addCart,
    removeCart,
  } = useCart();

  const totalPrice =
    products && products.reduce((prev, curr) => prev + +curr.price, 0);

  if (isLoading) return <p>Loading....</p>;
  if (products && products.length < 1)
    return <p>장바구니에 목록이 없습니다!</p>;

  const incrementProduct = (product) => {
    addCart.mutate({
      product: {
        ...product,
        count: product.count + 1,
      },
    });
  };

  const decrementProduct = (product) => {
    const { count } = product;
    if (count < 2) return;

    addCart.mutate({
      product: {
        ...product,
        count: count - 1,
      },
    });
  };

  const removeProduct = (product) => {
    removeCart.mutate({
      product,
    });
  };

  return (
    <div className="px-4">
      <Title title={"장바구니"} />
      <div className="px-4 pt-4 pb-1">
        {products && (
          <CartList
            products={products}
            incrementProduct={incrementProduct}
            decrementProduct={decrementProduct}
            removeProduct={removeProduct}
          />
        )}
      </div>
      <div className="flex flex-row items-center w-full justify-evenly py-6">
        <PriceBox title={"상품총액"} price={totalPrice} />
        <AiOutlinePlusCircle className="w-6 h-6" />
        <PriceBox title={"배송비"} price={SHIPPING} />
        <LuEqual className="w-6 h-6" />
        <PriceBox title={"총가격"} price={totalPrice + SHIPPING} />
      </div>
      <Button title={"주문하기"} />
    </div>
  );
}

export default Cart;
