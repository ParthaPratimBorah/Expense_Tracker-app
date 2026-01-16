import { useEffect, useState, useMemo } from 'react';
import { useApi } from '../hooks/useApi';
import { getBudgets, deleteBudget } from '../api/budgetsApi';
import { getExpenses } from '../api/expensesApi';
import type { Budget, Expense } from '../types';
import Button from '../components/ui/Button';
import BudgetList from '../components/features/budgets/BudgetList';
import Modal from '../components/ui/Modal';
import BudgetForm from '../components/features/budgets/BudgetForm';

const BudgetsPage = () => {
  const { data: budgets, request: fetchBudgets, loading: loadingBudgets } = useApi<Budget[]>(getBudgets);
  const { data: expenses, request: fetchExpenses, loading: loadingExpenses } = useApi<Expense[]>(getExpenses);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  useEffect(() => {
    fetchBudgets();
    fetchExpenses();
  }, []);
  
  const budgetsWithSpent = useMemo(() => {
    if (!budgets || !expenses) return [];
    const spentByCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {} as Record<string, number>);
    return budgets.map(budget => ({
      ...budget,
      spent: spentByCategory[budget.category] || 0,
    }));
  }, [budgets, expenses]);

  const handleEdit = (budget: Budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };
  
  const handleAdd = () => {
    setEditingBudget(null);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setEditingBudget(null);
    fetchBudgets();
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await deleteBudget(id);
        fetchBudgets();
      } catch (error) {
        console.error('Failed to delete budget', error);
      }
    }
  };
  
  const loading = loadingBudgets || loadingExpenses;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Budgets</h1>
        <Button onClick={handleAdd}>Add New Budget</Button>
      </div>
      <div>
        {loading && <p>Loading budgets...</p>}
        {budgetsWithSpent && (
          <BudgetList 
            budgets={budgetsWithSpent} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingBudget ? 'Edit Budget' : 'Add Budget'}
      >
        <BudgetForm onSuccess={handleSuccess} budgetToEdit={editingBudget} />
      </Modal>
    </div>
  );
};

export default BudgetsPage;