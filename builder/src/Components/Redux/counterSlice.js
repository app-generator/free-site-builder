import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    values: [],
};

const counterSlice = createSlice({
    name: "updatedComponents",
    initialState,
    reducers: {
        hanldePreviewClick: (state, action) => {
            state.values = action.payload;
        },
    },
});

export const { hanldePreviewClick } = counterSlice.actions;

export default counterSlice.reducer;
