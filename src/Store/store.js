import { configureStore } from "@reduxjs/toolkit";
import bookCartReducer from './bookCartslice';
import currentCartSlice from './currentCartSlice';

const store = configureStore({
    reducer:{
        books: bookCartReducer,
        showCart: currentCartSlice
    }
});

export default store;