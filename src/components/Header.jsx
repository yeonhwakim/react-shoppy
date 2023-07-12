import React from "react";
import { Link } from "react-router-dom";

import {
  AiOutlineSmile,
  AiOutlineShoppingCart,
  AiOutlineEdit,
} from "react-icons/ai";

import { useFirebase } from "../context/LoginContext";

function Header() {
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
      <Link
        to="/"
        className="flex items-center justify-between text-3xl font-bold"
      >
        <AiOutlineSmile className="mr-2" /> SHOPPY
      </Link>
      <div className="flex items-center">
        <Link to="/products" className="text-xl font-semibold">
          products
        </Link>
        <Link to="/cart" className="relative w-7 h-7 ml-2 mr-2.5">
          <AiOutlineShoppingCart className="block w-7 h-7 absolute inset-0 font-bold" />
          <div className="absolute absolute flex items-center justify-center rounded-full bg-black text-white -top-1.5 -right-1.5  w-4 h-4 text-xs font-semibold">
            {cart}
          </div>
        </Link>
        {isAdmin && (
          <Link to="/product/new" className="w-7 h-7 mr-2">
            <AiOutlineEdit className="block w-7 h-7 font-bold" />
          </Link>
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
