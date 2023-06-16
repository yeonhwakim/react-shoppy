import React from "react";
import { useNavigate } from "react-router-dom";

function Header(props) {
  const navigate = useNavigate();

  return (
    <nav>
      <button onClick={() => navigate("/")}>SHOPPY</button>
      <div>
        <button onClick={() => navigate("/products")}>products</button>
        <button onClick={() => navigate("/cart")}>
          cart<span>1</span>
        </button>
        <button onClick={() => navigate("/admin")}>admin</button>
        <span>user</span>
        <button>Login</button>
        <button>Logout</button>
      </div>
    </nav>
  );
}

export default Header;
