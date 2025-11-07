import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UIState {
  darkMode: boolean;
  isLoading: boolean;
}

const initialState: UIState = {
  darkMode: false,
  isLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { toggleDarkMode, setLoading } = uiSlice.actions;
export default uiSlice.reducer;
