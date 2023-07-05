import { createContext, useContext, useState, useEffect } from "react";

import app from "../config/firebase";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  setPersistence,
  browserSessionPersistence,
} from "firebase/auth";

import { getDatabase, ref, get, child } from "firebase/database";
import { addUser, getProductInCartCount } from "../api/firebase";

const authService = getAuth(app);
const provider = new GoogleAuthProvider();

const db = getDatabase(app);

export const LoginContext = createContext();

export function LoginContextProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState("");
  const [userProfile, setUserProfile] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [cart, setCart] = useState(0);

  useEffect(() => {
    const dbRef = ref(db);
    get(child(dbRef, "/admins"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          setAdminList(snapshot.val());
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    authService.onAuthStateChanged(async (user) => {
      if (user) {
        const { displayName, photoURL, email } = user;
        await addUser({ displayName, photoURL, email });
        ~adminList.indexOf(email) && setIsAdmin(true);
        setIsLogin(true);
        setUserName(displayName);
        setUserProfile(photoURL);
        setUserEmail(email);
      } else {
        setIsLogin(false);
      }
    });
  }, []);

  useEffect(() => {
    getProductInCartCount({ userEmail }).then((count) => {
      setCart(count);
    });
  }, []);

  const handleClickLogin = async () => {
    setPersistence(authService, browserSessionPersistence)
      .then(async () => {
        await signInWithPopup(authService, provider);

        onAuthStateChanged(authService, (user) => {
          if (user) {
            const { displayName, photoURL, email } = user;
            ~adminList.indexOf(email) && setIsAdmin(true);
            setIsLogin(true);
            setUserName(displayName);
            setUserProfile(photoURL);
          } else {
            setIsLogin(false);
          }
        });
      })
      .catch(({ code, message }) => {
        console.log(`${code}: ${message}`);
      });
  };

  const handleClickLogout = async () => {
    await signOut(authService);
    setIsLogin(false);
  };

  const handleAddCart = async () => {
    setCart((prevCount) => prevCount + 1);
  };

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        isAdmin,
        userName,
        userProfile,
        userEmail,
        cart,
        handleClickLogin,
        handleClickLogout,
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
