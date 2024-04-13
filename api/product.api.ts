import { HttpInstanceFactory } from "@/utils/HttpInstanceFactory";
import { fetchData } from "./baseInstance";
import axios, { AxiosInstance } from "axios";

export interface IProductPages {
  page: number;
  amount: number;
  total: number;
  products: Array<IProducts>;
}

export interface IProducts {
  id: number;
  image_url: string;
  title: string;
  description: string;
  price: number;
}

export class ProductApi {
  private fetchInstance;
  private static instance: ProductApi | null = null;
  private constructor() {
    this.fetchInstance = fetchData;
  }

  public static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new ProductApi();
    return this.instance;
  }

  async getProducts(page = 1, pageSize = 20): Promise<IProductPages> {
    const data = await this.fetchInstance(
      `/products?page=${page}&page_size=${pageSize}`
    );
    return data;
  }
}
