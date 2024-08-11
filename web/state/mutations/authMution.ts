import { useMutation } from '@tanstack/react-query';

import { LoginRequest, RegisterRequest } from '../../app/lib/types/authTypes';
import { message } from 'antd';
import { login, register } from '@/services/folders/authApi';

export const useLogin = () => {
  return useMutation({
    mutationFn: (command: LoginRequest) => {
      return login(command);
    },
    onError: error => {
      const errorMessage = error?.message || '로그인에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (command: RegisterRequest) => {
      return register(command);
    },
    onError: error => {
      const errorMessage = error?.message || '회원가입에 실패했습니다.';
      message.error(errorMessage);
    },
  });
};
