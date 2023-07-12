import React from "react";

function Select({ options, handleChangeProduct }) {
  return (
    <select
      className="rounded-md border-2 p-2 mb-2 w-full border-zinc-700 no-arrow"
      name="option"
      onChange={handleChangeProduct}
      required
    >
      <option value="" defaultValue>
        옵션들(콤마(,)로 구분)
      </option>
      {options.map(({ value, option }) => (
        <option value={value} key={value}>
          {option}
        </option>
      ))}
    </select>
  );
}

export default Select;
