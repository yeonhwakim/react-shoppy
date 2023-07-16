import React from "react";

import { AiOutlineMinusSquare, AiOutlinePlusSquare } from "react-icons/ai";
import { IoTrash } from "react-icons/io5";

function CartItem({
  product,
  decrementProduct,
  incrementProduct,
  removeProduct,
}) {
  const { image, name, price, selectOption, count } = product;

  return (
    <li className="flex flex-row justify-between items-center mb-3">
      <div className="flex flex-row items-center">
        <img src={image} alt={`${name} 이미지`} className="h-60 mr-2" />
        <div>
          <p className="text-lg">{name}</p>
          <p className="text-lg font-bold">{selectOption}</p>
          <p className="text-basic">₩{price}</p>
        </div>
      </div>
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center">
          <button onClick={() => decrementProduct(product)}>
            <AiOutlineMinusSquare className="w-6 h-6" />
          </button>
          <span className="text-lg font-bold px-2">{count}</span>
          <button onClick={() => incrementProduct(product)}>
            <AiOutlinePlusSquare className="w-6 h-6" />
          </button>
        </div>
        <button onClick={() => removeProduct(product)}>
          <IoTrash className="w-6 h-6 ml-2" />
        </button>
      </div>
    </li>
  );
}

export default CartItem;
