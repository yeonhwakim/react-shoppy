import React from "react";

function ProductItem({ product, handleClickProduct }) {
  const { id, image, name, price, category } = product;

  const handleClick = () => {
    handleClickProduct(id, product);
  };

  return (
    <li
      className="rounded-md flex flex-col items-center shadow-xl overflow-hidden"
      key={id}
      onClick={() => handleClick()}
    >
      <img className="w-50" src={image} alt={`${name} 이미지`} />
      <div className="w-full p-2">
        <div className="flex flex-row justify-between">
          <span className="text-base font-bold truncate">{name}</span>
          <span className="text-base font-bold">₩{price}</span>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-500">
            {category}
          </span>
        </div>
      </div>
    </li>
  );
}

export default ProductItem;
