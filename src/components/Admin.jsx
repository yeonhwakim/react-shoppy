import React from "react";

const options = [
  { value: "1", option: "xs,s,m,l,xl" },
  { value: "2", option: "xxs,xs,s,m,l,xl,xx" },
  { value: "3", option: "6,38,40,42" },
  { value: "4", option: "상의,하의,탈의" },
  { value: "5", option: "상의,하의" },
  { value: "6", option: "r,t,y" },
];
function Admin(props) {
  return (
    <div>
      <img />
      <form>
        <input type="file" name="image" />
        <input type="text" name="name" placeholder="제품명" />
        <input type="text" name="price" placeholder="가격" />
        <input type="text" name="category" placeholder="카테고리" />
        <input type="text" name="description" placeholder="제품설명" />
        <select name="options">
          <option value="" disabled selected>
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
