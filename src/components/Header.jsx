import React from "react";
import { Link } from "react-router-dom";

import useCart from "../hooks/useCart";

import {
  AiOutlineSmile,
  AiOutlineShoppingCart,
  AiOutlineEdit,
} from "react-icons/ai";

import { useFirebase } from "../context/LoginContext";
import LgButton from "./LgButton";
import User from "./User";

function Header() {
  const { user, login, logout } = useFirebase();
  const {
    cartQuery: { data: products },
  } = useCart();

  return (
    <nav className="flex items-center justify-between p-4">
      <Link
        to="/"
        className="flex items-center justify-between text-3xl font-bold"
      >
        <AiOutlineSmile className="mr-2" /> SHOPPY
      </Link>
      <div className="flex items-center gap-4">
        <Link to="/products" className="text-xl font-semibold">
          products
        </Link>
        {user && (
          <Link to="/cart" className="relative w-7 h-7">
            <AiOutlineShoppingCart className="block w-7 h-7 absolute inset-0 font-bold" />
            <div className="absolute absolute flex items-center justify-center rounded-full bg-black text-white -top-1.5 -right-1.5  w-4 h-4 text-xs font-semibold">
              {products.length}
            </div>
          </Link>
        )}
        {user && user.isAdmin && (
          <Link to="/product/new" className="w-7 h-7 ">
            <AiOutlineEdit className="block w-7 h-7 font-bold" />
          </Link>
        )}
        {user && <User user={user} />}
        {!user && <LgButton title={"Login"} handleClick={login} />}
        {user && <LgButton title={"Logout"} handleClick={logout} />}
      </div>
    </nav>
  );
}

export default Header;
