import { createSlice } from "@reduxjs/toolkit";

/* Setting the initial state of the basket. */
const initialState = {
  items: [],
};

/* Creating a slice of the global store. */
export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (basketItem) => basketItem.id === action.payload.id
      );

      let newBasket = [...state.items];

      if (index >= 0) {
        newBasket.splice(index, 1);
      } else {
        console.warn(
          `Cannot remove the product (id: ${action.payload.id}) from the basket)`
        );
      }
      state.items = newBasket;
    },
  },
});

/* Exporting the actions and the reducer. */
export const { addToBasket, removeFromBasket } = basketSlice.actions;

// Selectors - This is how we pull information from the Global store slice
export const selectItems = (state) => state.basket.items;
export const selectTotal = (state) =>
  state.basket.items.reduce((total, item) => total + item.price, 0);

export default basketSlice.reducer;
/* This is the search bar. It is hidden on small screens and is displayed on medium screens and
above. */
