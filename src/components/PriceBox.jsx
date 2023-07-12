import React from "react";

function PriceBox({ title, price }) {
  return (
    <div className="flex flex-col items-center p-6 rounded-md bg-zinc-100">
      <span className="font-semibold text-xl font-zinc-700">{title}</span>
      <span className="font-bold text-lg">{`₩${price}`}</span>
    </div>
  );
}

export default PriceBox;
