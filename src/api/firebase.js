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

export function isProductInCart({ userEmail, productId, selectOption }) {
  try {
    const dbRef = ref(db);
    return get(
      child(
        dbRef,
        `carts/${userEmail.split("@")[0]}/${productId}/${selectOption}`
      )
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

export function addCart({ userEmail, product, productId }) {
  try {
    set(
      ref(
        db,
        `carts/${userEmail.split("@")[0]}/${productId}/${product.selectOption}`
      ),
      product
    );
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
