import { createSlice } from "@reduxjs/toolkit";

const currentCartSlice = createSlice({
    name: "currentCartSlice",
    initialState: {
        showCurrentcart: false,
    },
    reducers:{
        showCart(state) {
            state.showCurrentcart = true;
        },
        hideCart(state) {
            state.showCurrentcart = false;
        }
    }
});

export const actions = currentCartSlice.actions; 
export default currentCartSlice.reducer;