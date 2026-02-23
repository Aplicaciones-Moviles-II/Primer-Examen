import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
    items: [],
    },
    reducers: {
    //Agrega el producto al carrito o incrementa cantidad si es que ya existe
    addToCart: (state, action) => {
        const existing = state.items.find(i => i.id === action.payload.id);
        if (existing) {
        existing.quantity += 1;
        } else {
        state.items.push({ ...action.payload, quantity: 1 });
        }
    },
    //Elimina un producto completo del carrito por su id
    removeFromCart: (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
    },
    //Incrementa la cantidad de un producto específico
    increaseQty: (state, action) => {
        const item = state.items.find(i => i.id === action.payload);
        if (item) item.quantity += 1;
    },
    //Decrementa la cantidad, pero el mínimo es 1
    decreaseQty: (state, action) => {
        const item = state.items.find(i => i.id === action.payload);
        if (item && item.quantity > 1) item.quantity -= 1;
    },
    //Vacía el carrito completamente (Ya sea que lo cancele o lo pague)
    clearCart: (state) => {
        state.items = [];
    },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;