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
