import React from "react";

function Header(props) {
  return (
    <nav>
      <button>SHOPPY</button>
      <div>
        <button>products</button>
        <button>
          cart<span>1</span>
        </button>
        <button>admin</button>
        <span>user</span>
        <button>Login</button>
        <button>Logout</button>
      </div>
    </nav>
  );
}

export default Header;
