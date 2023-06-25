import React from "react";
import Products from "./Products";

function Home(props) {
  return (
    <div>
      <div>
        <p>OPENING SALE!</p>
        <p>2023.06.01~2023.06.30</p>
      </div>
      <Products />
    </div>
  );
}

export default Home;
