import { AxiosInstance } from "axios";
import { fetchData } from "./baseInstance";
import { HttpInstanceFactory } from "@/utils/HttpInstanceFactory";

export interface IReview {
  id: number;
  text: string;
}

export class ReviewApi {
  private httpInstance: AxiosInstance;
  private static instance: ReviewApi | null = null;
  private constructor() {
    this.httpInstance = HttpInstanceFactory.getInstance();
  }

  public static getInstance() {
    if (this.instance) return this.instance;
    this.instance = new ReviewApi();
    return this.instance;
  }

  async getReviews(): Promise<IReview[]> {
    const { data } = await this.httpInstance.get("/reviews");
    return data;
  }
}
