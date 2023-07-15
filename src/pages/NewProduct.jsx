import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { createImageUrl } from "../api/cloudinary";
import { addProduct } from "../api/firebase";

import File from "../components/File";
import Input from "../components/Input";
import Button from "../components/Button";
import Title from "../components/Title";

const inputList = [
  { name: "name", type: "text", placeholder: "제품명" },
  { name: "price", type: "number", placeholder: "가격" },
  { name: "category", type: "text", placeholder: "카테고리" },
  { name: "description", type: "text", placeholder: "제품설명" },
  { name: "options", type: "text", placeholder: "옵션들 (콤마(,)로 구분)" },
];

function NewProduct() {
  const navigate = useNavigate();

  const [file, setFile] = useState({});
  const [product, setProduct] = useState({
    image: "",
    name: "",
    price: "",
    category: "",
    description: "",
    options: "",
  });

  const { image } = product;

  const handleChangeProduct = (e) => {
    const { name, value } = e.target;
    setProduct((product) => ({
      ...product,
      [name]: name === "options" ? value.split(",") : value,
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
    <div>
      <Title title={"새로운 제품 등록"} />
      <div className="p-4 flex flex flex-col items-center">
        {image && <img className="mb-2 " src={image} alt="이미지" />}
        <form onSubmit={handleSubmit}>
          <File handleChangeImage={handleChangeImage} />
          {inputList.map((inputItem) => (
            <Input
              key={inputItem.name}
              inputItem={inputItem}
              value={product[inputItem.name]}
              handleChangeProduct={handleChangeProduct}
            />
          ))}
          <Button title={"제품 등록하기"} />
        </form>
      </div>
    </div>
  );
}

export default NewProduct;
