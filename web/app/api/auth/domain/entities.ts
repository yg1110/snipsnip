export interface User {
  id: string;
  email: string;
}

export interface AuthTokensResponse {
  id: number;
  accessToken: string;
  refreshToken: string;
}
