import React from "react";

function NewProduct({ title }) {
  return (
    <button
      className="rounded-md border-2 p-2 mb-2 w-full border-black bg-black text-white"
      type="submit"
    >
      {title}
    </button>
  );
}

export default NewProduct;
