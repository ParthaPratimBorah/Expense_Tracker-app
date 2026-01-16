import api from './axios';
import type { Expense, ExpensePayload } from '../types';

export const getExpenses = async (): Promise<Expense[]> => {
  const response = await api.get('/expenses');
  return response.data;
};

export const addExpense = async (expenseData: ExpensePayload): Promise<Expense> => {
  const response = await api.post('/expenses', expenseData);
  return response.data;
};

export const updateExpense = async (id: string, expenseData: Partial<ExpensePayload>): Promise<Expense> => {
  const response = await api.put(`/expenses/${id}`, expenseData);
  return response.data;
};

export const deleteExpense = async (id: string): Promise<{ message: string }> => {
  const response = await api.delete(`/expenses/${id}`);
  return response.data;
};