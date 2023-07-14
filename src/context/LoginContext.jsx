import { createContext, useContext, useState, useEffect } from "react";

import app from "../config/firebase";
import { getAuth } from "firebase/auth";

import {
  addUser,
  getProductInCartCount,
  login,
  onUserStateChange,
  logout,
} from "../api/firebase";

const authService = getAuth(app);

export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [cart, setCart] = useState(0);

  useEffect(() => {
    onUserStateChange(setUser);

    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, photoURL, email } = user;
        await addUser({ displayName, photoURL, email });
      }
    });
  }, []);

  useEffect(() => {
    Object.keys(user).length &&
      getProductInCartCount({ email: user?.email }).then((count) => {
        setCart(count);
      });
  }, []);

  const handleAddCart = async () => {
    setCart((prevCount) => prevCount + 1);
  };

  const handleLogin = () => {
    login();
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <LoginContext.Provider
      value={{
        user,
        handleLogin,
        handleLogout,
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
