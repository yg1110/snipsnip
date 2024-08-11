import generateApiClientFetcher from '@/services/generateApiClientFetcher';
import {
  AuthTokensResponse,
  LoginRequest,
  RegisterRequest,
  User,
} from '../../app/lib/types/authTypes';

const apiClient = generateApiClientFetcher(process.env.NEXT_PUBLIC_BASE_API, {
  'Content-Type': 'application/json',
  credentials: 'include',
});

export const login = async (command: LoginRequest) => {
  return apiClient<AuthTokensResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(command),
  });
};

export const register = async (command: RegisterRequest) => {
  const { passwordConfirm, ...rest } = command;
  return apiClient<User>('/users/register', {
    method: 'POST',
    body: JSON.stringify(rest),
  });
};
