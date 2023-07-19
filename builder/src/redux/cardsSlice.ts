import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    addItemsCard: (state, action) => {
      state.items = action.payload;
    },
    updateItemsCard: (state, action) => {
      state.items = {
        ...state.items,
        [action.payload.id]: action.payload.content,
      };
    },
  },
});
export const {
  updateItemsCard,
  addItemsCard
} = cardsSlice.actions;
export default cardsSlice.reducer;
