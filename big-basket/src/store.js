import { configureStore } from "@reduxjs/toolkit";
import slice from "./slice";

export const stores=configureStore({
    reducer:{
        products:slice
    }
})