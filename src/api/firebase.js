import app from "../config/firebase";

import {
  getDatabase,
  ref,
  set,
  push,
  get,
  child,
  update,
  onValue,
} from "firebase/database";

const db = getDatabase(app);

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
    const dbRef = ref(getDatabase());
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

export function addCart({ userName, product }) {
  try {
    ref
      .child("users")
      .orderByChild("ID")
      .equalTo("U1EL5623")
      .once("value", (snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("exists!", userData);
        }
      });
    onValue(child(db, `carts/${userName}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          update(child(db, `carts/${userName}`), {});

          const cartRef = ref(db, `carts/${userName}`);
          const newCartRef = push(cartRef);
          set(newCartRef, product);
        } else {
          set(ref(db, `carts/${userName}`, { product }));
        }
        return true;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  } catch (error) {
    console.error(error);
    return false;
  }
}
