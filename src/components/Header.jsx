import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AiOutlineSmile,
  AiOutlineShoppingCart,
  AiOutlineEdit,
} from "react-icons/ai";

function Header(props) {
  const navigate = useNavigate();

  return (
    <nav className="flex items-center justify-between p-4">
      <button
        className="flex items-center justify-between text-3xl font-bold"
        onClick={() => navigate("/")}
      >
        <AiOutlineSmile className="mr-2" /> SHOPPY
      </button>
      <div className="flex items-center">
        <button
          className="text-xl font-semibold"
          onClick={() => navigate("/products")}
        >
          products
        </button>
        <button
          className="relative w-7 h-7 ml-2 mr-2.5"
          onClick={() => navigate("/cart")}
        >
          <AiOutlineShoppingCart className="block w-7 h-7 absolute inset-0 font-bold" />
          <div className="absolute absolute flex items-center justify-center rounded-full bg-black text-white -top-1.5 -right-1.5  w-4 h-4 text-xs font-semibold">
            1
          </div>
        </button>
        <button className="w-7 h-7 mr-2" onClick={() => navigate("/admin")}>
          <AiOutlineEdit className="block w-7 h-7 font-bold" />
        </button>
        <div className="mr-2 flex items-center justify-center">
          <div className="w-7 h-7 mr-1 rounded-full bg-black"></div>
          <span className="text-xl font-semibold">user</span>
        </div>
        <button className="text-xl font-semibold border-2 border-stone-600 rounded px-2">
          Login
        </button>
        <button className="text-xl font-semibold border-2 border-stone-600 rounded px-2">
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Header;
