const initialState = {
    order: 'asc_short',
    direction: 0,
}

export const sortReducer = (state = initialState, action) => {
    console.log(state);
    switch (action.type) {
        case 'SORT_BY_SHORT': {

            let sort
            let direction
            // console.log(action, state);
            if (state.direction === 0) {
                sort = 'asc_target'
            }
            else {
                sort = 'desc_target'
                direction = 0
            }
            return {
                ...state, order: sort, direction: direction
            }
        }
        case 'SORT_BY_TARGET': {
            const sort = state.order === 'asc_target' ? 'asc_target' : 'desc_target'
            return {
                ...state, order: sort
            }
        }
        case 'SORT_BY_COUNTER': {
            const sort = state.order === 'asc_counter' ? 'asc_counter' : 'desc_counter'

            return {
                ...state, order: sort
            }
        }
        default: {
            return state
        }
    }
}
