import React, { useEffect, useState } from "react";

import {
  AiOutlineMinusSquare,
  AiOutlinePlusSquare,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { IoTrash } from "react-icons/io5";
import { LuEqual } from "react-icons/lu";

import { useFirebase } from "../context/LoginContext";

import { getProductInCart, removeCart, addCart } from "../api/firebase";

function Cart() {
  const { userId } = useFirebase();
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    getProductInCart({ userId }).then((cart) => {
      cart.forEach((cartProducts) => {
        Object.values(cartProducts).forEach((product) => {
          const { price, count } = product;
          setProducts((prev) => [...prev, product]);
          setTotalPrice((prev) => prev + +price * +count);
        });
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const incrementProduct = async (idx) => {
    await setProducts((prev) =>
      prev.map((item, index) =>
        idx === index ? { ...item, count: item.count + 1 } : item
      )
    );

    const product = products[idx];

    await addCart({
      userId,
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
        userId,
        product,
      });
      setTotalPrice((prev) => prev - +price);

      return;
    }

    await addCart({
      userId,
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
      userId,
      product,
    });

    setTotalPrice((prev) => prev - +price * +count);
  };

  return (
    <div className="px-4">
      <div className="py-5 text-center text-xl font-bold border-t-2 border-zinc-700">
        내 장바구니
      </div>
      <div className="px-4 pt-4 pb-1 border-t-2 border-b-2 border-zinc-700">
        <ul>
          {products &&
            products.map(
              ({ image, name, selectOption, price, count }, index) => (
                <li
                  key={index}
                  className="flex flex-row justify-between items-center mb-3"
                >
                  <div className="flex flex-row items-center">
                    <img
                      src={image}
                      alt={`${name} 이미지`}
                      className="h-60 mr-2"
                    />
                    <div>
                      <p className="text-lg">{name}</p>
                      <p className="text-lg font-bold">{selectOption}</p>
                      <p className="text-basic">₩{price}</p>
                    </div>
                  </div>
                  <div className="flex flex-row items-center">
                    <div className="flex flex-row items-center">
                      <button onClick={() => decrementProduct(index)}>
                        <AiOutlineMinusSquare className="w-6 h-6" />
                      </button>
                      <span className="text-lg font-bold px-2">{count}</span>
                      <button onClick={() => incrementProduct(index)}>
                        <AiOutlinePlusSquare className="w-6 h-6" />
                      </button>
                    </div>
                    <button onClick={() => removeProduct(index)}>
                      <IoTrash className="w-6 h-6 ml-2" />
                    </button>
                  </div>
                </li>
              )
            )}
        </ul>
      </div>
      <div className="flex flex-row items-center w-full justify-evenly py-6">
        <div className="flex flex-col items-center p-6 rounded-md bg-zinc-100">
          <span className="font-semibold text-xl font-zinc-700">상품총액</span>
          <span className="font-bold text-lg">{`₩${totalPrice}`}</span>
        </div>
        <div>
          <AiOutlinePlusCircle className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-center  p-6 rounded-md bg-zinc-100">
          <span className="font-semibold text-xl font-zinc-700">배송비</span>
          <span className="font-bold text-lg">₩3000</span>
        </div>
        <div>
          <LuEqual className="w-6 h-6" />
        </div>
        <div className="flex flex-col items-center  p-6 rounded-md bg-zinc-100">
          <span className="font-semibold text-xl font-zinc-700">총가격</span>
          <span className="font-bold text-lg">{`₩${totalPrice + 3000}`}</span>
        </div>
      </div>
      <button className="rounded-md border-2 p-2 mb-4 w-full border-black bg-black text-white">
        주문하기
      </button>
    </div>
  );
}

export default Cart;
