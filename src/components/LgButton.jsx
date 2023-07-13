import React from "react";

function LgButton({ title, handleClick }) {
  return (
    <button
      className="text-xl font-semibold border-2 border-stone-600 rounded px-2"
      onClick={handleClick}
    >
      {title}
    </button>
  );
}

export default LgButton;
