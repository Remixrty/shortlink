const initialState = {
    loginActive: false,
    registerActive: false,
}

export const chooseReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ACTIVE': {
            return {
                ...state, loginActive: true, registerActive: false
            }
        }
        case 'REGISTER_ACTIVE': {
            return {
                ...state, loginActive: false, registerActive: true
            }
        }
        case 'NOBODY_ACTIVE': {
            return {
                ...state, loginActive: false, registerActive: false
            }
        }
        default: {
            return state
        }
    }
}

// const modalSlice = createSlice({
//     name: 'modal',
//     initialState,
//     reducers: {
//         changeModal: (state, action) => {
//             switch (action.type) {
//                 case 'LOGIN_ACTIVE': {
//                     state.loginActive = true;
//                     state.registerActive = false;
//                 }
//                 case 'REGISTER_ACTIVE': {
//                     state.loginActive = false;
//                     state.registerActive = true;
//                 }
//                 case 'NOBODY_ACTIVE': {
//                     state.loginActive = false;
//                     state.registerActive = false;

