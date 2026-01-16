import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApi } from '../hooks/useApi';
import { getExpenses } from '../api/expensesApi';
import { getBudgets } from '../api/budgetsApi';
import type { Expense, Budget } from '../types';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ExpensesPieChart from '../components/charts/ExpensesPieChart';
import BudgetBarChart from '../components/charts/BudgetBarChart';
import { formatCurrency } from '../lib/utils';

const DashboardPage = () => {
  const { data: expenses, request: fetchExpenses, loading: loadingExpenses } = useApi<Expense[]>(getExpenses);
  const { data: budgets, request: fetchBudgets, loading: loadingBudgets } = useApi<Budget[]>(getBudgets);

  useEffect(() => {
    fetchExpenses();
    fetchBudgets();
  }, []);

  const budgetVsActual = useMemo(() => {
    if (!budgets || !expenses) return [];
    const spentByCategory = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
        return acc;
      }, {} as Record<string, number>);

    return budgets.map(budget => ({
        name: budget.category,
        budget: budget.limit,
        spent: spentByCategory[budget.category] || 0
    }));
  }, [budgets, expenses]);
  
  const expensesByCategory = useMemo(() => {
    if (!expenses) return [];
    return budgetVsActual.map(item => ({ name: item.name, value: item.spent })).filter(item => item.value > 0);
  }, [budgetVsActual]);
  
  const totalSpent = useMemo(() => expenses?.reduce((sum, e) => sum + e.amount, 0) || 0, [expenses]);
  const totalBudget = useMemo(() => budgets?.reduce((sum, b) => sum + b.limit, 0) || 0, [budgets]);
  const remainingBudget = totalBudget - totalSpent;


  if (loadingExpenses || loadingBudgets) return <p>Loading dashboard...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Link to="/expenses">
          <Button variant="accent" className="w-full py-4 text-xl">
            Manage Expenses
          </Button>
        </Link>
        <Link to="/budgets">
          <Button variant="accent" className="w-full py-4 text-xl">
            Set Budgets
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card><h3 className="font-bold">Total Budget</h3><p className="text-2xl">{formatCurrency(totalBudget)}</p></Card>
        <Card><h3 className="font-bold">Total Spent</h3><p className="text-2xl text-red-600">{formatCurrency(totalSpent)}</p></Card>
        <Card><h3 className="font-bold">Remaining</h3><p className="text-2xl text-green-600">{formatCurrency(remainingBudget)}</p></Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-xl font-bold">Category Summary</h2>
          <div className="space-y-4">
            {budgetVsActual.map(item => {
              const spent = item.spent || 0;
              const remaining = item.budget - spent;
              const progress = (spent / item.budget) * 100;

              return (
                <div key={item.name}>
                  <div className="flex justify-between mb-1 font-semibold">
                    <span>{item.name}</span>
                    <span>{formatCurrency(spent)} / {formatCurrency(item.budget)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-secondary h-2.5 rounded-full" style={{ width: `${progress > 100 ? 100 : progress}%` }}></div>
                  </div>
                  <p className={`text-sm text-right ${remaining < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                    {remaining >= 0 ? `${formatCurrency(remaining)} remaining` : `${formatCurrency(Math.abs(remaining))} over`}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
        <div className="space-y-6 lg:col-span-3">
            <Card>
              <h2 className="mb-4 text-xl font-bold">Expenses by Category</h2>
              <ExpensesPieChart data={expensesByCategory} />
            </Card>
            <Card>
              <h2 className="mb-4 text-xl font-bold">Budget vs. Actual Spend</h2>
              <BudgetBarChart data={budgetVsActual} />
            </Card>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;