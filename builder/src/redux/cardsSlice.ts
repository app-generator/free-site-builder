import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
};

const cardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    updateItemsCard: (state, action) => {
      state.items = {
        ...state.items,
        [action.payload.id]: action.payload.content,
      };
    },
  },
});
export const { updateItemsCard } = cardsSlice.actions;
export default cardsSlice.reducer;
