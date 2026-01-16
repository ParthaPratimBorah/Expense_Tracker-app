import { useEffect, useState, useMemo } from 'react';
import { useApi } from '../hooks/useApi';
import { getExpenses, deleteExpense } from '../api/expensesApi';
import { getBudgets } from '../api/budgetsApi';
import type { Expense, Budget } from '../types';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import ExpenseList from '../components/features/expenses/ExpenseList';
import Modal from '../components/ui/Modal';
import ExpenseForm from '../components/features/expenses/ExpenseForm';

const ExpensesPage = () => {
  const { data: expenses, error, loading, request: fetchExpenses } = useApi<Expense[]>(getExpenses);
  const { data: budgets, request: fetchBudgets } = useApi<Budget[]>(getBudgets);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  useEffect(() => {
    fetchExpenses();
    fetchBudgets();
  }, []);

  const budgetCategories = useMemo(() => {
    if (!budgets) return [];
    return budgets.map(budget => budget.category);
  }, [budgets]);


  const handleEdit = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };
  
  const handleAdd = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setEditingExpense(null);
    fetchExpenses();
  };
  
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {
        await deleteExpense(id);
        fetchExpenses();
      } catch (error) {
        console.error('Failed to delete expense', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Expenses</h1>
        <Button onClick={handleAdd}>Add New Expense</Button>
      </div>
      <Card>
        {loading && <p>Loading expenses...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {expenses && (
          <ExpenseList 
            expenses={expenses} 
            onEdit={handleEdit} 
            onDelete={handleDelete} 
          />
        )}
      </Card>
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingExpense ? 'Edit Expense' : 'Add Expense'}
      >
        <ExpenseForm 
          onSuccess={handleSuccess} 
          expenseToEdit={editingExpense} 
          categories={budgetCategories} 
        />
      </Modal>
    </div>
  );
};

export default ExpensesPage;