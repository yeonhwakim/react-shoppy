import app from "../config/firebase";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
  remove,
} from "firebase/database";

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
    set(ref(db, `users/${user.email.split("@")[0]}`), user);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function addProduct({ product }) {
  try {
    const productsListRef = ref(db, "products");
    const newProductsRef = push(productsListRef);
    set(newProductsRef, product);
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
        if (snapshot.exists()) {
          const products = snapshot.val();
          return Object.keys(products).map((key) => ({
            ...products[key],
            id: key,
          }));
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

export function isProductInCart({ email, productId, selectOption }) {
  try {
    const dbRef = ref(db);
    return get(
      child(dbRef, `carts/${email.split("@")[0]}/${productId}/${selectOption}`)
    )
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

export function addCart({ email, product }) {
  try {
    const { productId, selectOption } = product;
    set(
      ref(db, `carts/${email.split("@")[0]}/${productId}/${selectOption}`),
      product
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function removeCart({ email, product }) {
  try {
    const { productId, selectOption } = product;
    remove(
      ref(db, `carts/${email.split("@")[0]}/${productId}/${selectOption}`)
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export function getProductInCartCount({ email }) {
  try {
    return get(child(ref(db), `carts/${email.split("@")[0]}`))
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

export function getProductInCart({ email }) {
  try {
    return get(child(ref(db), `/carts/${email.split("@")[0]}`))
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
