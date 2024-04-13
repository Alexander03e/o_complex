import { AxiosInstance } from "axios";
import { fetchData } from "./baseInstance";
import { HttpInstanceFactory } from "@/utils/HttpInstanceFactory";

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
interface IOrderItem {
  id: string;
  quantity: string;
}
interface IOrderData {
  phone: string;
  cart: Array<IOrderItem>;
}

export class ProductApi {
  private fetchInstance;
  private httpInstance: AxiosInstance;
  private static instance: ProductApi | null = null;
  private constructor() {
    this.httpInstance = HttpInstanceFactory.getInstance();
    this.fetchInstance = fetchData;
  }

  public static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new ProductApi();
    return this.instance;
  }

  async getProducts(
    page = 1,
    pageSize = 20
  ): Promise<IProductPages | undefined> {
    try {
      const data = await this.fetchInstance(
        `/products?page=${page}&page_size=${pageSize}`
      );
      return data;
    } catch (e) {
      console.log("products error");
    }
  }

  async publicOrder(data: IOrderData) {
    try {
      await this.httpInstance.post("/order", {
        ...data,
      });
      return { success: 1 };
    } catch (e) {
      console.log("public order error");
      return { success: 0 };
    }
  }
}
