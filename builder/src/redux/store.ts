import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cardsSlice from "./cardsSlice.ts";
import { loadState, saveState } from "../util/ls.ts";
import throttle from "lodash.throttle";

const persistedState = loadState();

const rootReducer = combineReducers({
  cards: cardsSlice,
});
const store = configureStore({
  reducer: rootReducer,
  preloadedState: {
    cards: {
      items: persistedState,
    },
  },
});

store.subscribe(() => {
  const {
    cards: { items },
  }: any = store.getState();
  saveState(items);
});

store.subscribe(
  throttle(() => {
    const {
      cards: { items },
    }: any = store.getState();
    saveState(items);
  }, 1000)
);

export default store;
