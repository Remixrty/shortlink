import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    username: null,
    token: null,
    isAuth: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.username = action.payload.username;
            state.token = action.payload.token;
            state.isAuth = action.payload.isAuth
        },
        removeUser: (state) => {
            state.username = null;
            state.token = null;
            state.isAuth = false
        }
    }
})

export const { setUser, removeUser } = userSlice.actions

export default userSlice.reducer