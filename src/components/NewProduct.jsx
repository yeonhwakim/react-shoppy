import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { createImageUrl } from "../api/cloudinary";
import { addProduct } from "../api/firebase";

const options = [
  { value: "1", option: "xs,s,m,l,xl" },
  { value: "2", option: "xxs,xs,s,m,l,xl,xx" },
  { value: "3", option: "6,38,40,42" },
  { value: "4", option: "상의,하의,탈의" },
  { value: "5", option: "상의,하의" },
  { value: "6", option: "r,t,y" },
];

function NewProduct(props) {
  const navigate = useNavigate();

  const [file, setFile] = useState({});
  const [product, setProduct] = useState({
    image: "",
    name: "",
    price: "",
    category: "",
    description: "",
    option: "",
  });

  const { image, name, price, category, description } = product;

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setProduct((product) => ({
      ...product,
      [name]:
        name === "option"
          ? options.filter(({ value: id }) => id === value)[0].option
          : value,
    }));
  };

  const handleChangeImage = (e) => {
    const { files, name } = e.target;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setProduct((product) => ({
          ...product,
          [name]: e.target.result,
        }));
      };
      reader.readAsDataURL(files[0]);
      setFile(files[0]);
    } else {
      setProduct((product) => ({
        ...product,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 이미지 url 생성 => cloudinary
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET); // unsigned preset => setting 에서 확인 가능

    const image = await createImageUrl({ formData });

    // 정보 저장 => firebase
    const result = await addProduct({ product: { ...product, image } });

    result ? navigate("/") : alert("오류 발생, 관리자에게 문의 바랍니다.");
  };

  return (
    <div className="p-4 flex flex flex-col items-center">
      {image && <img className="mb-2 " src={image} alt="이미지" />}
      <form onSubmit={handleSubmit}>
        <input
          className="rounded-md border-2 p-2 mb-2 w-full border-zinc-700"
          type="file"
          name="image"
          onChange={handleChangeImage}
          required
        />
        <input
          className="rounded-md border-2 p-2  mb-2 w-full border-zinc-700"
          type="text"
          name="name"
          value={name}
          placeholder="제품명"
          onChange={handleChangeProduct}
          required
        />
        <input
          className="rounded-md border-2 p-2 mb-2 w-full border-zinc-700"
          type="text"
          name="price"
          value={price}
          placeholder="가격"
          onChange={handleChangeProduct}
          required
        />
        <input
          className="rounded-md border-2 p-2 mb-2 w-full border-zinc-700"
          type="text"
          name="category"
          value={category}
          placeholder="카테고리"
          onChange={handleChangeProduct}
          required
        />
        <input
          className="rounded-md border-2 p-2 mb-2 w-full border-zinc-700"
          type="text"
          name="description"
          value={description}
          placeholder="제품설명"
          onChange={handleChangeProduct}
          required
        />
        <select
          className="rounded-md border-2 p-2 mb-2 w-full border-zinc-700 no-arrow"
          name="option"
          onChange={handleChangeProduct}
          required
        >
          <option value="" defaultValue>
            옵션들(콤마(,)로 구분)
          </option>
          {options.map(({ value, option }) => (
            <option value={value} key={value}>
              {option}
            </option>
          ))}
        </select>
        <button
          className="rounded-md border-2 p-2 mb-2 w-full border-black bg-black text-white"
          type="submit"
        >
          제품 등록하기
        </button>
      </form>
    </div>
  );
}

export default NewProduct;
