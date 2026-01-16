// For Authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
}

export interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

// For Expenses
export interface Expense {
  _id: string;
  user: string;
  title: string;
  amount: number;
  category: string;
  date: string;
}

export type ExpensePayload = Omit<Expense, '_id' | 'user' | 'createdAt' | 'updatedAt'>;

// For Budgets
export interface Budget {
  _id: string;
  user: string;
  category: string;
  limit: number;
}

export type BudgetPayload = Omit<Budget, '_id' | 'user' | 'createdAt' | 'updatedAt'>;