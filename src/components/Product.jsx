import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useFirebase } from "../context/LoginContext";
import { getProduct, addCart } from "../api/firebase";

function Product() {
  const { id } = useParams();
  const { isLogin, userName, handleClickLogin } = useFirebase();

  const [product, setProduct] = useState({});
  const [selectOption, setSelectOption] = useState({});
  const { category, description, image, name, option, price } = product;

  useEffect(() => {
    getProduct({ id }).then((product) => {
      setProduct(product);
      setSelectOption(product?.option?.split(",")[0]);
    });
  }, []);

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
      const result = await addCart({
        userName,
        product: Object.assign({ ...product }, { selectOption }),
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
              <select name="" id="" onChange={handleChangeOption}>
                {option &&
                  option.split(",").map((item) => (
                    <option value={item} key={item}>
                      {item}
                    </option>
                  ))}
              </select>
            </div>
            <button onClick={handleClickCart}>장바구니에 추가</button>
          </div>
        </div>
      </div>
    )
  );
}

export default Product;
