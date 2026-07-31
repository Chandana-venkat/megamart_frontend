import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    wishlistItems: []

};

const wishlistSlice = createSlice({

    name: "wishlist",

    initialState,

    reducers: {

        // Add Product
        addToWishlist: (state, action) => {

            const existingItem = state.wishlistItems.find(

                item => item.id === action.payload.id

            );

            if (!existingItem) {

                state.wishlistItems.push(action.payload);

            }

        },

        // Remove Product
        removeFromWishlist: (state, action) => {

            state.wishlistItems = state.wishlistItems.filter(

                item => item.id !== action.payload

            );

        },

        // Clear Wishlist
        clearWishlist: (state) => {

            state.wishlistItems = [];

        }

    }

});

export const {

    addToWishlist,

    removeFromWishlist,

    clearWishlist

} = wishlistSlice.actions;

export default wishlistSlice.reducer;