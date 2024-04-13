import axios, { AxiosInstance } from "axios";

export class HttpInstanceFactory {
  private static baseInstance: AxiosInstance;

  public static getInstance() {
    if (this.baseInstance) return this.baseInstance;
    this.baseInstance = axios.create({
      baseURL: "http://o-complex.com:1337",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return this.baseInstance;
  }
}
