import { useState, useEffect } from "react";
import { Product, ProductListResponse } from "@/types/product";
import { productService } from "@/services/productService";

export const useProducts = (limit: number = 10, skip: number = 0) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await productService.getProducts(limit, skip);
        setProducts(response.products);
        setTotal(response.total);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [limit, skip]);

  return { products, loading, error, total };
};
