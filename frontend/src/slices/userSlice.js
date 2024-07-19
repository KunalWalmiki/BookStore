import { createSlice } from "@reduxjs/toolkit";

const initailState = {
    //localStorage values sustain even when user closes the tab
    //fetching token from localStorage if present then parse , and if not then setting token value as null 
    token : localStorage.getItem("token") ? localStorage.getItem("token") : null,
    loading  : false,
    user :  localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,

} 

const authSlice = createSlice({

    name : "auth",
    initialState : initailState,
    reducers : {
         setToken(state, value) {
            state.token = value.payload;
         },
         setLoading(state, value) {
            state.loading = value.payload;
         },
         setUser(state, value) {
             state.user = value.payload;
         }

    }
});


export const {setToken, setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;

