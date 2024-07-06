import { AxiosInstance, AxiosRequestConfig } from "axios";
import { AuthTokensResponse } from "./domain/entities";
import { ApiServiceResponse } from "../common/ApiServiceResponse";
import { LoginRequset } from "./domain/AuthRequset";
import { AuthRepository } from "./domain/AuthRepository";

export class AuthApiClient implements AuthRepository {
  constructor(private axios: AxiosInstance) {}

  login = async (
    command: LoginRequset
  ): Promise<ApiServiceResponse<AuthTokensResponse>> => {
    const config: AxiosRequestConfig = {
      url: "/auth/login",
      method: "post",
      data: command,
    };

    const { data } = await this.axios.request<
      ApiServiceResponse<AuthTokensResponse>
    >(config);

    return data;
  };
}
