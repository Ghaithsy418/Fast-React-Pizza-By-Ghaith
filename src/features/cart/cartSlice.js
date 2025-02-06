import { createSelector, createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      console.log(item);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalQuantityById = function (id) {
  return createSelector(
    (state) => state.cart.cart,
    (cart) => cart.find((item) => item.pizzaId === id)?.quantity ?? 0,
  );
};

export const getTotalCartQuantity = createSelector(
  (state) => state.cart.cart,
  (cart) => cart.reduce((sum, curr) => sum + curr.quantity, 0),
);

export const getTotalCartPrice = createSelector(
  (state) => state.cart.cart,
  (cart) => cart.reduce((sum, curr) => sum + curr.totalPrice, 0),
);
