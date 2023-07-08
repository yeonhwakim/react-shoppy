import React from "react";
import { useNavigate } from "react-router-dom";

import {
  AiOutlineSmile,
  AiOutlineShoppingCart,
  AiOutlineEdit,
} from "react-icons/ai";

import { useFirebase } from "../context/LoginContext";

function Header() {
  const navigate = useNavigate();
  const {
    isLogin,
    userName,
    userProfile,
    cart,
    isAdmin,
    handleClickLogin,
    handleClickLogout,
  } = useFirebase();

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
            {cart}
          </div>
        </button>
        {isAdmin && (
          <button className="w-7 h-7 mr-2" onClick={() => navigate("/admin")}>
            <AiOutlineEdit className="block w-7 h-7 font-bold" />
          </button>
        )}
        {isLogin && (
          <div className="mr-2 flex items-center justify-center">
            <img
              className="w-7 h-7 mr-1 rounded-full bg-black"
              src={userProfile}
              alt={`${userName} 프로필`}
            />
            <span className="text-xl font-semibold">{userName}</span>
          </div>
        )}
        {isLogin ? (
          <button
            className="text-xl font-semibold border-2 border-stone-600 rounded px-2"
            onClick={handleClickLogout}
          >
            Logout
          </button>
        ) : (
          <button
            className="text-xl font-semibold border-2 border-stone-600 rounded px-2"
            onClick={handleClickLogin}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}

export default Header;
