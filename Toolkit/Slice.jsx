import { createSlice } from '@reduxjs/toolkit'
const Slice = createSlice({
    name : 'user',
    initialState : {
        id : null,
        username : null,
        isAdmin : null
    },
    reducers : {
        LOGIN_ACTION : (state,action) => {
            let { id, username, isAdmin } = action.payload
            state.id = id;
            state.username = username;
            state.isAdmin = isAdmin
        },
        LOGOUT_ACTION : (state,action) => {
            state.id = null,
            state.username = null
            state.isAdmin = null
        }
    }
})
export let { LOGIN_ACTION, LOGOUT_ACTION } = Slice.actions;
export default Slice.reducer;