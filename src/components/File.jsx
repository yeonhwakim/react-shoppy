import React from "react";

function File({ handleChangeImage }) {
  return (
    <input
      className="rounded-md border-2 p-2 mb-2 w-full border-zinc-700"
      type="file"
      name="image"
      onChange={handleChangeImage}
      required
    />
  );
}

export default File;
