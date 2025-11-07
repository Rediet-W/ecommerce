import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./slices/favoritesSlice";
import uiReducer from "./slices/uiSlice";
import authReducer from "./slices/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      favorites: favoritesReducer,
      ui: uiReducer,
      auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
