import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";

const selectProductsState = (state: RootState) => state.products;

export const selectAllProducts = createSelector(
  [selectProductsState],
  (products) => products.items
);

export const selectProductById = (productId: number) =>
  createSelector([selectAllProducts], (products) =>
    products.find((product) => product.id === productId)
  );

export const selectProductsLoading = createSelector(
  [selectProductsState],
  (products) => products.loading
);

export const selectProductsError = createSelector(
  [selectProductsState],
  (products) => products.error
);
