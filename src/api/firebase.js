import app from "../config/firebase";

import { v4 as uuidv4 } from "uuid";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { getDatabase, ref, set, get, child, remove } from "firebase/database";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export function login() {
  return signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  return signOut(auth).catch(console.error);
}

export async function onUserStateChange(callback) {
  return onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;

    callback(updatedUser);
  });
}

function adminUser(user) {
  return get(ref(db, "/admins"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);

        if (isAdmin) {
          return { ...user, isAdmin };
        }

        return user;
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function addUser(user) {
  try {
    set(ref(db, `users/${user.uid}`), user);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function addProduct({ product, image }) {
  try {
    const productId = uuidv4();
    set(ref(db, `products/${productId}`), { ...product, image, id: productId });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getProducts() {
  try {
    const dbRef = ref(db);
    return get(child(dbRef, "/products"))
      .then((snapshot) => {
        return snapshot.exists() ? Object.values(snapshot.val()) : [];
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getProduct({ id }) {
  try {
    const dbRef = ref(db);
    return get(child(dbRef, `products/${id}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function isProductInCart({ userId, productId, selectOption }) {
  try {
    const dbRef = ref(db);
    return get(child(dbRef, `carts/${userId}/${productId}/${selectOption}`))
      .then((snapshot) => {
        return snapshot.exists() ? snapshot.val() : false;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function addCart({ userId, product }) {
  try {
    const { productId, selectOption } = product;
    set(ref(db, `carts/${userId}/${productId}/${selectOption}`), product);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function removeCart({ userId, product }) {
  try {
    const { productId, selectOption } = product;
    remove(ref(db, `carts/${userId}/${productId}/${selectOption}`));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getProductInCartCount({ userId }) {
  try {
    return get(child(ref(db), `carts/${userId}`))
      .then((snapshot) => {
        return snapshot.exists()
          ? Object.keys(Object.values(snapshot.val())[0]).length
          : 0;
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getProductInCart({ userId }) {
  try {
    return get(child(ref(db), `/carts/${userId}`))
      .then((snapshot) => {
        return snapshot.exists()
          ? Object.values(Object.values(snapshot.val())[0])
          : [];
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
    console.error(error);
    return false;
  }
}
