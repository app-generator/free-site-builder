import { combineReducers } from "redux";
import counterReducer from "./counterSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    updatedComponents: counterReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export default store;
