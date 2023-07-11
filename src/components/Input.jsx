import React from "react";

function Input({ inputItem, value, handleChangeProduct }) {
  const { name, type, placeholder } = inputItem;

  return (
    <input
      className="rounded-md border-2 p-2  mb-2 w-full border-zinc-700"
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={handleChangeProduct}
      required
    />
  );
}

export default Input;
