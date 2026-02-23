import { configureStore } from '@reduxjs/toolkit';
    import cartReducer from '../store/cartSlice';

//Store global de Redux que contiene el estado del carrito
const store = configureStore({
    reducer: {
    cart: cartReducer,
    },
});

export default store;