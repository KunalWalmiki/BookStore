import { createSlice } from "@reduxjs/toolkit";

const initailState = {
    //localStorage values sustain even when user closes the tab
    //fetching token from localStorage if present then parse , and if not then setting token value as null 
    book : localStorage.getItem("book") ? JSON.parse(localStorage.getItem("book")) : null,
    loading  : false,

} 

const bookSlice = createSlice({

    name : "book",
    initialState : initailState,
    reducers : {
         setBook(state, value) {
            state.token = value.payload;
         },
         setLoading(state, value) {
            state.loading = value.payload;
         },
    }
    
});


export const {setBook, setLoading} = bookSlice.actions;
export default bookSlice.reducer;

