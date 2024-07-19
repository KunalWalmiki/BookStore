import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slices/userSlice";
import bookSlice from "../slices/bookSlice";


export const rootReducer = combineReducers({
       auth : authSlice,
       book : bookSlice,
})