import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { getProducts, addProduct as addNewProduct } from "../api/firebase";

export default function useProducts() {
  const queryClient = useQueryClient();

  const productsQuery = useQuery(["products"], getProducts, {
    staleTime: 1000 * 60,
  });

  const addProduct = useMutation({
    mutationFn: ({ product, image }) => addNewProduct({ product, image }),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  return { productsQuery, addProduct };
}
