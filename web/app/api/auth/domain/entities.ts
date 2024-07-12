export interface User {
  id: string;
  email: string;
}

export interface AuthTokensResponse {
  id: number;
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  passwordConfirm: string;
}
