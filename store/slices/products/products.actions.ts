import { ProductApi } from "@/api/product.api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

const productsApi = ProductApi.getInstance();

export const getProductsByPagination = createAsyncThunk(
  "get/productsByPagination",
  async (
    { page = 1, pageSize = 20 }: { page?: number; pageSize?: number },
    thunkAPI
  ) => {
    try {
      const response = await productsApi.getProducts(page, pageSize);
      console.log("test");
      return thunkAPI.fulfillWithValue(response);
    } catch (e) {
      const error = (e as AxiosError<any>).response?.data;
      console.log(e);

      return thunkAPI.rejectWithValue("error");
    }
  }
);
