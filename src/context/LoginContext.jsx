import { createContext, useContext, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  getProductInCartCount,
  login,
  onUserStateChange,
  logout,
} from "../api/firebase";

export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  const { data: cartCount } = useQuery(["cartCount"], () =>
    getProductInCartCount({ userId: user && user.uid })
  );

  const handleAddCart = async () => {
    // setCart((prevCount) => prevCount + 1);
  };

  return (
    <LoginContext.Provider
      value={{
        user,
        userId: user && user.uid,
        cartCount,
        login,
        logout,
        handleAddCart,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useFirebase() {
  return useContext(LoginContext);
}
