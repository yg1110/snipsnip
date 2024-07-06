import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export type CreateFetcher = (config: AxiosRequestConfig) => AxiosInstance;
export type FetcherReturnType = ReturnType<CreateFetcher>;

export const createFetcher: CreateFetcher = (config = {}) =>
  axios.create({ ...config, withCredentials: true });
