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

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
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

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        isAdmin,
        userName,
        userProfile,
        handleClickLogin,
        handleClickLogout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export function useFirebase() {
  return useContext(LoginContext);
}
