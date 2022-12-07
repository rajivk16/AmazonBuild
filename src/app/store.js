import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "../slices/basketSlice";

/* Creating a store with the reducer. */
export const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});
