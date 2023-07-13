import { createContext, useContext, useState, useEffect } from "react";

import app from "../config/firebase";
import { getAuth } from "firebase/auth";

import {
  getAdmin,
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
  const [adminList, setAdminList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState(0);

  useEffect(() => {
    onUserStateChange(setUser);

    getAdmin().then((admins) => {
      setAdminList(admins);
    });

    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, photoURL, email } = user;
        await addUser({ displayName, photoURL, email });
        ~adminList.indexOf(email) && setIsAdmin(true);
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
        isAdmin,
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
