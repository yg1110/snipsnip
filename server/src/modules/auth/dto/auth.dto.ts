export class CreateUserDto {
  email: string;
  password: string;
}

export class UpdateUserDto {
  email: string | null;
  password: string | null;
}

export class LoginUserDto {
  email: string;
  password: string;
}
