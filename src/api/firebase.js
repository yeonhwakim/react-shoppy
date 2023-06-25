import app from "../config/firebase";

import { getDatabase, ref, set, push } from "firebase/database";

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
