import app from "../config/firebase";

import { getDatabase, ref, set, push, get, child } from "firebase/database";

const db = getDatabase(app);

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

export function addCart({ userName, product }) {
  try {
    const cartsListRef = ref(db, `carts/${userName}`);
    const newCartsRef = push(cartsListRef);
    set(newCartsRef, product);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
