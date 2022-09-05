import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    offset: 0,
    limit: 15,
}

const offsetSlice = createSlice({
    name: 'offset',
    initialState,
    reducers: {
        increaseOffset: (state, action) => {
            state.offset++
        },
        decreaseOffset: (state, action) => {
            if (state.offset > 0) state.offset -= 1
        }
    }
})

export const { increaseOffset, decreaseOffset } = offsetSlice.actions

export default offsetSlice.reducer