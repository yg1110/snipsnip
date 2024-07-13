export type AuthTokensResponse = {
  id: number;
  accessToken: string;
  refreshToken: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type RegisterRequest = {
  email: string;
  password: string;
  passwordConfirm: string;
};

export type User = {
  id: number;
  email: string;
  createdAt: string;
  updatedAt: string;
};
