import { IProducts } from "@/api/product.api";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getProductsByPagination } from "./products.actions";
import { Status } from "./products.types";
interface IProudctsState {
  products: Array<IProducts>;
  initialProducts: Array<IProducts>;
  meta: {
    total: number;
    pagination: {
      page: number;
      pageSize: number;
    };
  };
  status: Status;
}

const initialState: IProudctsState = {
  products: [],
  initialProducts: [],
  meta: {
    total: 228,
    pagination: {
      page: 1,
      pageSize: 20,
    },
  },
  status: Status.IDLE,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action) {
      state.initialProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getProductsByPagination.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.products.push(...action.payload.products);
        state.meta.total = action.payload.total;
        state.meta.pagination = {
          page: action.payload.page,
          pageSize: action.payload.pageSize,
        };
        state.status = Status.SUCCESS;
      }
    );
    builder.addCase(getProductsByPagination.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(getProductsByPagination.rejected, (state) => {
      state.status = Status.ERROR;
    });
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
