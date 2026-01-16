import { useState } from 'react';

interface ApiHook<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
  request: (...args: any[]) => Promise<void>;
}

export const useApi = <T>(apiFunc: (...args: any[]) => Promise<T>): ApiHook<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = async (...args: any[]) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunc(...args);
      setData(result);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    request,
  };
};