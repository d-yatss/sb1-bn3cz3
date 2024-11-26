import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/axios';
import type { LoginCredentials, RegisterCredentials, AuthResponse } from '../types/auth';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<AuthResponse>('/auth/login', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const { data } = await api.post<AuthResponse>('/auth/register', credentials);
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem('token', data.token);
      navigate('/dashboard');
    },
  });
};