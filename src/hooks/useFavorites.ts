"use client";
import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  addFavorite,
  removeFavorite,
  clearFavorites,
} from "@/store/slices/favoritesSlice";
import { Product } from "@/types/product";
import { toast } from "sonner";

export const useFavorites = () => {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorites.items); // Fixed selector

  const isFavorite = useCallback(
    (productId: number) => {
      return favorites.some((item) => item.id === productId);
    },
    [favorites]
  );

  const addToFavorites = useCallback(
    (product: Product) => {
      dispatch(addFavorite(product));
      toast.success("Product added to favorites!");
    },
    [dispatch]
  );

  const removeFromFavorites = useCallback(
    (productId: number) => {
      dispatch(removeFavorite(productId));
      toast.success("Product removed from favorites!");
    },
    [dispatch]
  );

  const clearAllFavorites = useCallback(() => {
    dispatch(clearFavorites());
    toast.success("All favorites cleared!");
  }, [dispatch]);

  const toggleFavorite = useCallback(
    (product: Product) => {
      if (isFavorite(product.id)) {
        removeFromFavorites(product.id);
      } else {
        addToFavorites(product);
      }
    },
    [isFavorite, addToFavorites, removeFromFavorites]
  );

  return {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    clearFavorites: clearAllFavorites,
    toggleFavorite,
    favoritesCount: favorites.length,
  };
};
