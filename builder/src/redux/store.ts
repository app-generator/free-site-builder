import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cardsSlice.ts";

const rootReducer = combineReducers({
  cards: cardsSlice,
});
const store = configureStore({
  reducer: rootReducer,
});
export default store;
