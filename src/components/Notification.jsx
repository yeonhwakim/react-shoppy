import React from "react";

import { AiFillCheckSquare } from "react-icons/ai";

function Notification({ title }) {
  return (
    <div className="flex flex-row">
      <AiFillCheckSquare className="block w-7 h-7 text-lime-400 ml-2" />
      {title}
    </div>
  );
}

export default Notification;
