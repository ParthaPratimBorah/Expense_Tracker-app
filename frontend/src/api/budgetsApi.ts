import api from './axios';
import type { Budget, BudgetPayload } from '../types';

export const getBudgets = async (): Promise<Budget[]> => {
  const response = await api.get('/budgets');
  return response.data;
};

export const addBudget = async (budgetData: BudgetPayload): Promise<Budget> => {
  const response = await api.post('/budgets', budgetData);
  return response.data;
};

export const updateBudget = async (id: string, budgetData: Partial<BudgetPayload>): Promise<Budget> => {
  const response = await api.put(`/budgets/${id}`, budgetData);
  return response.data;
};

export const deleteBudget = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/budgets/${id}`);
  return response.data;
};