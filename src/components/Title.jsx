import React from "react";

function Title({ title }) {
  return (
    <div className="py-5 text-center text-xl font-bold border-y-2 border-zinc-700 w-full">
      {title}
    </div>
  );
}

export default Title;
