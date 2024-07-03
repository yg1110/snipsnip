export class CreateUserDto {
  email: string;
  password: string;
}

export class UpdateUserDto {
  email: string | null;
  password: string | null;
}
