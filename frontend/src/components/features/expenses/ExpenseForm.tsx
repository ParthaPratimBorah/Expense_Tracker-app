import { useState, useEffect } from 'react';
import { addExpense, updateExpense } from '../../../api/expensesApi';
import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
import type { Expense } from '../../../types';

interface ExpenseFormProps {
  onSuccess?: () => void;
  expenseToEdit?: Expense | null;
  categories: string[];
}

const ExpenseForm = ({ onSuccess, expenseToEdit, categories }: ExpenseFormProps) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (expenseToEdit) {
      setTitle(expenseToEdit.title);
      setAmount(expenseToEdit.amount.toString());
      setCategory(expenseToEdit.category);
      setDate(new Date(expenseToEdit.date).toISOString().split('T')[0]);
    } else {
      setTitle('');
      setAmount('');
      setCategory(categories[0] || '');
      setDate('');
    }
  }, [expenseToEdit, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const expenseData = {
      title,
      amount: parseFloat(amount),
      category,
      date,
    };

    try {
      if (expenseToEdit) {
        await updateExpense(expenseToEdit._id, expenseData);
      } else {
        await addExpense(expenseData);
      }
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save expense');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <InputField id="title" label="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <InputField id="amount" label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      <div>
        <label htmlFor="category" className="block mb-1 text-sm font-medium text-gray-700">Category</label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 bg-white border-2 border-black rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          required
        >
          <option value="" disabled>Select a category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <InputField id="date" label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : (expenseToEdit ? 'Update Expense' : 'Save Expense')}
      </Button>
    </form>
  );
};

export default ExpenseForm;