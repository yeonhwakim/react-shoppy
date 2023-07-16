import { createContext, useContext, useState, useEffect } from "react";

import {
  getProductInCartCount,
  login,
  onUserStateChange,
  logout,
} from "../api/firebase";

export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [user, setUser] = useState();
  const [cart, setCart] = useState(0);

  useEffect(() => {
    onUserStateChange(setUser);
  }, []);

  useEffect(() => {
    user &&
      getProductInCartCount({ userId: user && user.uid }).then((count) => {
        setCart(count);
      });
  }, []);

  const handleAddCart = async () => {
    setCart((prevCount) => prevCount + 1);
  };

  return (
    <LoginContext.Provider
      value={{
        user,
        userId: user && user.uid,
        login,
        logout,
        cart,
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
