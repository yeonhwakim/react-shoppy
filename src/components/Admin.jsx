import React, { useState } from "react";
import { createImageUrl } from "../api/cloudinary";

const options = [
  { value: "1", option: "xs,s,m,l,xl" },
  { value: "2", option: "xxs,xs,s,m,l,xl,xx" },
  { value: "3", option: "6,38,40,42" },
  { value: "4", option: "상의,하의,탈의" },
  { value: "5", option: "상의,하의" },
  { value: "6", option: "r,t,y" },
];
function Admin(props) {
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
    formData.append("upload_preset", "sbvpj9ux"); // unsigned preset => setting 에서 확인 가능

    const image = await createImageUrl({ formData });

    // 정보 저장 => firebase
  };

  return (
    <div>
      {image && <img src={image} alt="이미지" />}
      <form onSubmit={handleSubmit}>
        <input type="file" name="image" onChange={handleChangeImage} />
        <input
          type="text"
          name="name"
          value={name}
          placeholder="제품명"
          onChange={handleChangeProduct}
        />
        <input
          type="text"
          name="price"
          value={price}
          placeholder="가격"
          onChange={handleChangeProduct}
        />
        <input
          type="text"
          name="category"
          value={category}
          placeholder="카테고리"
          onChange={handleChangeProduct}
        />
        <input
          type="text"
          name="description"
          value={description}
          placeholder="제품설명"
          onChange={handleChangeProduct}
        />
        <select name="option" onChange={handleChangeProduct}>
          <option value="" disabled defaultValue>
            옵션들(콤마(,)로 구분)
          </option>
          {options.map(({ value, option }) => (
            <option value={value} key={value}>
              {option}
            </option>
          ))}
        </select>
        <button type="submit">제품 등록하기</button>
      </form>
    </div>
  );
}

export default Admin;
