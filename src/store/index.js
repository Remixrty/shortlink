import { configureStore } from "@reduxjs/toolkit";
import { chooseReducer } from "./reducers/modalReducer";
import { sortReducer } from "./reducers/sortReducer";
import offsetSlice from "./slices/offsetSlice";
import sortSlice from "./slices/sortSlice";
import userReducer from './slices/userSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        modal: chooseReducer,
        offset: offsetSlice,
        sort: sortSlice
    }
})