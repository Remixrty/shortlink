import { configureStore } from "@reduxjs/toolkit";
import { chooseReducer } from "./reducers/modalReducer";
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        modal: chooseReducer
    }
})