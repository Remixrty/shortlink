import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    order: 'asc_short',
    direction: true,
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        orderShort: (state, action) => {
            state.order = state.direction ? 'desc_short' : 'asc_short'
            state.direction = !state.direction
        },
        orderTarget: (state) => {
            state.order = state.direction ? 'desc_target' : 'asc_target'
            state.direction = !state.direction
        },
        orderCounter: (state) => {
            state.order = state.direction ? 'desc_counter' : 'asc_counter'
            state.direction = !state.direction
        }
    }
})

export const { orderShort, orderTarget, orderCounter } = sortSlice.actions

export default sortSlice.reducer