import api from './axios';
import type { LoginCredentials, RegisterData, AuthResponse } from '../types';

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};