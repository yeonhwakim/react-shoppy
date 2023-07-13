import React from "react";

function User({ user: { photoURL, displayName } }) {
  return (
    <div className="mr-2 flex items-center justify-center">
      <img
        className="w-7 h-7 mr-1 rounded-full bg-black"
        src={photoURL}
        alt={`${displayName} 프로필`}
      />
      <span className="text-xl font-semibold">{displayName}</span>
    </div>
  );
}

export default User;
