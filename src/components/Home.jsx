import React from "react";
import Products from "./Products";

function Home(props) {
  return (
    <div>
      <div className="w-full bg-black px-2 py-10 text-white flex flex-col items-center">
        <p className="text-white font-bold text-2xl mb-2">OPENING SALE!</p>
        <p className="text-white">2023.06.01~2023.06.30</p>
      </div>
      <Products />
    </div>
  );
}

export default Home;
