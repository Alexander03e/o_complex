import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ICartProduct {
  id: number;
  title: string;
  count: number;
  sum: number;
  price: number;
}

interface ICartProductPayload {
  id: number;
  title: string;
  price: number;
}

interface ICartState {
  number: string;
  totalPrice: number;
  products: Array<ICartProduct>;
}

const initialState: ICartState = {
  number: "",
  totalPrice: 0,
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<ICartProductPayload>) {
      const findProduct = state.products.find(
        (item) => item.id == action.payload.id
      );
      if (findProduct) {
        findProduct.count++;
        findProduct.sum = findProduct.price * findProduct.count;
      } else {
        state.products.push({
          ...action.payload,
          count: 1,
          sum: action.payload.price,
        });
      }
      state.totalPrice = state.products.reduce(
        (sum, val) => val.price * val.count + sum,
        0
      );
    },
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
    },
    addSomeProducts(
      state,
      action: PayloadAction<ICartProductPayload & { count: number }>
    ) {
      const findProduct = state.products.find(
        (item) => item.id == action.payload.id
      );

      if (findProduct) {
        findProduct.count = +action.payload.count;
        findProduct.sum = findProduct.count * findProduct.price;
      }
      state.totalPrice = state.products.reduce(
        (sum, val) => val.price * val.count + sum,
        0
      );
    },
    setNumber(state, action) {
      state.number = action.payload;
    },
    removeFromCart(state, action) {
      const findProduct = state.products.find(
        (item) => item.id == action.payload.id
      );
      if (findProduct) {
        if (findProduct.count > 1) {
          findProduct.count--;
        } else {
          state.products = state.products.filter(
            (item) => item.id != action.payload.id
          );
        }
      }
      state.totalPrice = state.products.reduce(
        (sum, val) => val.price * val.count + sum,
        0
      );
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  addSomeProducts,
  setNumber,
} = cartSlice.actions;
export default cartSlice.reducer;
