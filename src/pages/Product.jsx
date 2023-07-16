import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { useFirebase } from "../context/LoginContext";
import { addCart, isProductInCart } from "../api/firebase";

import Notification from "../components/Notification";

function Product() {
  const { id } = useParams();
  const {
    state: { product },
  } = useLocation();
  const { user, userId, handleClickLogin, handleAddCart } = useFirebase();
  const { category, description, image, name, options, price } = product;

  const [selectOption, setSelectOption] = useState(options && options[0]);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    let timeoutId = null;
    if (isSuccess) {
      timeoutId = setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isSuccess]);

  const handleClickCart = async () => {
    if (!user) {
      const confirm = window.confirm("로그인 해주세요!");

      if (confirm) {
        handleClickLogin();
        return;
      }

      return;
    }

    const confirm = window.confirm("장바구니에 담으시겠습니까?");

    if (confirm) {
      const isProduct = await isProductInCart({
        userId,
        productId: id,
        selectOption,
      });

      if (isProduct && isProduct.selectOption === selectOption) {
        const confirm = window.confirm(
          "장바구니에 있습니다. 추가하시겠습니까?"
        );

        if (!confirm) {
          return;
        }

        const result = await addCart({
          userId,
          product: Object.assign(
            { ...product },
            { selectOption, count: isProduct.count + 1, productId: id }
          ),
        });

        if (result) {
          await handleAddCart();
          setIsSuccess(true);
        }

        return window.alert(
          "오류가 발생했습니다. 관리자에게 문의 부탁드립니다."
        );
      }

      const result = await addCart({
        userId,
        product: Object.assign(
          { ...product },
          { selectOption, count: 1, productId: id }
        ),
      });

      if (result) {
        await handleAddCart();
        setIsSuccess(true);
        return;
      }

      return window.alert("오류가 발생했습니다. 관리자에게 문의 부탁드립니다.");
    }

    return;
  };

  const handleChangeOption = (e) => {
    const { value } = e.target;
    setSelectOption(value);
  };

  return (
    <div className="flex flex-col items-center w-full py-2 px-8">
      <div className="flex items-start w-full mb-4 text-base font-semibold text-gray-400">{`> ${category}`}</div>
      <div className="flex flex-row w-full justify-between">
        <img className="mr-4" src={image} alt={`${name} 이미지`} />
        <div className="flex flex-col w-full p-2">
          <div className="flex flex-col w-full border-b-2 border-gray-400">
            <span className="text-xl font-bold text-black mb-2">{name}</span>
            <span className="text-xl font-bold text-black mb-2">₩{price}</span>
          </div>
          <p className="py-2 text-base text-gray-600">{description}</p>
          <div className="flex flex-row justify-between">
            <label htmlFor="select" className="text-base">
              옵션
            </label>
            <select
              id="select"
              className="outline-0 w-11/12 border-2 border-dashed border-black"
              onChange={handleChangeOption}
              selected={selectOption}
            >
              {options &&
                options.map((item) => (
                  <option value={item} key={item}>
                    {item}
                  </option>
                ))}
            </select>
          </div>
          {isSuccess && <Notification title={"장바구니에 담겼습니다."} />}
          <button
            className="rounded-md border-2 p-2 mb-2 w-full border-black bg-black text-white mt-4"
            onClick={handleClickCart}
          >
            장바구니에 추가
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
