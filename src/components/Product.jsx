import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useFirebase } from "../context/LoginContext";
import { getProduct, addCart, isProductInCart } from "../api/firebase";

function Product() {
  const { id } = useParams();
  const { isLogin, userEmail, handleClickLogin } = useFirebase();

  const [product, setProduct] = useState({});
  const [selectOption, setSelectOption] = useState({});
  const { category, description, image, name, option, price } = product;

  useEffect(() => {
    getProduct({ id }).then((product) => {
      setProduct(product);
      setSelectOption(product?.option?.split(",")[0]);
    });
  }, [id]);

  const handleClickCart = async () => {
    if (!isLogin) {
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
        userEmail,
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
          userEmail,
          product: Object.assign(
            { ...product },
            { selectOption, count: isProduct.count + 1 }
          ),
          productId: id,
        });

        if (!result) {
          window.alert("오류가 발생했습니다. 관리자에게 문의 부탁드립니다.");
        }

        return;
      }

      const result = await addCart({
        userEmail,
        product: Object.assign({ ...product }, { selectOption, count: 1 }),
        productId: id,
      });

      if (!result) {
        window.alert("오류가 발생했습니다. 관리자에게 문의 부탁드립니다.");
      }
    }

    return;
  };

  const handleChangeOption = (e) => {
    const { value } = e.target;
    setSelectOption(value);
  };

  return (
    product && (
      <div className="flex flex-col items-center w-full py-2 px-8">
        <div className="flex items-start w-full mb-4 text-base font-semibold text-gray-400">{`> ${category}`}</div>
        <div className="flex flex-row w-full justify-between">
          <img className="mr-4" src={image} alt={`${name} 이미지`} />
          <div className="flex flex-col w-full p-2">
            <div className="flex flex-col w-full border-b-2 border-gray-400">
              <span className="text-xl font-bold text-black mb-2">{name}</span>
              <span className="text-xl font-bold text-black mb-2">
                ₩{price}
              </span>
            </div>
            <p className="py-2 text-base text-gray-600">{description}</p>
            <div className="flex flex-row justify-between">
              <span className="text-base">옵션 </span>
              <select
                className="outline-0 w-11/12 border-2 border-dashed border-black"
                onChange={handleChangeOption}
              >
                {option &&
                  option.split(",").map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            <button
              className="rounded-md border-2 p-2 mb-2 w-full border-black bg-black text-white mt-4"
              onClick={handleClickCart}
            >
              장바구니에 추가
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Product;
