import { ApiServiceResponse } from "../../common/ApiServiceResponse";
import { LoginRequset } from "./AuthRequset";
import { AuthTokensResponse } from "./entities";

export interface AuthRepository {
  login(command: LoginRequset): Promise<ApiServiceResponse<AuthTokensResponse>>;
}
