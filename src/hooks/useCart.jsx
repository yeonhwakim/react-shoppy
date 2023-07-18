import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getProductInCart,
  addCart as addCartProduct,
  removeCart as removeCartProduct,
} from "../api/firebase";

import { useFirebase } from "../context/LoginContext";

export default function useCart() {
  const { userId } = useFirebase();
  const queryClient = useQueryClient();

  const cartQuery = useQuery(
    ["cart"],
    async () => await getProductInCart({ userId }),
    {
      staleTime: 1000 * 60,
    }
  );

  const addCart = useMutation({
    mutationFn: ({ product }) => addCartProduct({ userId, product }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const removeCart = useMutation({
    mutationFn: ({ product }) => removeCartProduct({ userId, product }),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
  });

  return { cartQuery, addCart, removeCart };
}
