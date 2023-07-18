import { createContext, useContext, useState, useEffect } from "react";

import { login, onUserStateChange, logout } from "../api/firebase";

export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  return (
    <LoginContext.Provider
      value={{
        user,
        userId: user && user.uid,
        login,
        logout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useFirebase() {
  return useContext(LoginContext);
}
