import { configureStore } from "@reduxjs/toolkit";
import cryptoReducer from '../Features/cryptoSlice'

export const store = configureStore({
    reducer : {
        app : cryptoReducer
    }
})