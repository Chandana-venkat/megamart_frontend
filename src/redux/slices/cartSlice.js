import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    cartItems: JSON.parse(localStorage.getItem("cart")) || []

};

const cartSlice = createSlice({

    name: "cart",

    initialState,

    reducers: {

        // Add Product
        addToCart: (state, action) => {

            const existingItem = state.cartItems.find(

                item => item.id === action.payload.id

            );

            if (existingItem) {

                existingItem.quantity += 1;

            }

            else {

                state.cartItems.push({

                    ...action.payload,

                    quantity: 1

                });

            }

            localStorage.setItem(
                "cart",
                JSON.stringify(state.cartItems)
            );

        },

        // Remove Product
        removeFromCart: (state, action) => {

            state.cartItems = state.cartItems.filter(

                item => item.id !== action.payload

            );

            localStorage.setItem(
                "cart",
                JSON.stringify(state.cartItems)
            );

        },

        // Increase Quantity
        increaseQuantity: (state, action) => {

            const item = state.cartItems.find(

                item => item.id === action.payload

            );

            if (item) {

                item.quantity += 1;

            }

            localStorage.setItem(
                "cart",
                JSON.stringify(state.cartItems)
            );

        },

        // Decrease Quantity
        decreaseQuantity: (state, action) => {

            const item = state.cartItems.find(

                item => item.id === action.payload

            );

            if (item && item.quantity > 1) {

                item.quantity -= 1;

            }

            localStorage.setItem(
                "cart",
                JSON.stringify(state.cartItems)
            );

        },

        // Clear Cart
        clearCart: (state) => {

            state.cartItems = [];

            localStorage.removeItem("cart");

        }

    }

});

export const {

    addToCart,

    removeFromCart,

    increaseQuantity,

    decreaseQuantity,

    clearCart

} = cartSlice.actions;

export default cartSlice.reducer;