export class LoginUserDto {
  email: string;
  password: string;
}

export class Auth {
  id: number;
  email: string;
}

export class AuthTokensResponse {
  id: number;
  accessToken: string;
  refreshToken: string;
}
