import { useState, useEffect } from 'react';
import { addBudget, updateBudget } from '../../../api/budgetsApi';
import Button from '../../ui/Button';
import InputField from '../../ui/InputField';
import type { Budget } from '../../../types';

interface BudgetFormProps {
  onSuccess?: () => void;
  budgetToEdit?: Budget | null;
}

const BudgetForm = ({ onSuccess, budgetToEdit }: BudgetFormProps) => {
  const [category, setCategory] = useState('');
  const [limit, setLimit] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (budgetToEdit) {
      setCategory(budgetToEdit.category);
      setLimit(budgetToEdit.limit.toString());
    } else {
      setCategory('');
      setLimit('');
    }
  }, [budgetToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const budgetData = {
      category,
      limit: parseFloat(limit),
    };

    try {
      if (budgetToEdit) {
        await updateBudget(budgetToEdit._id, budgetData);
      } else {
        await addBudget(budgetData);
      }
      setIsLoading(false);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save budget');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <InputField
        id="category"
        label="Category"
        type="text"
        placeholder="e.g., Food"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <InputField
        id="limit"
        label="Limit"
        type="number"
        placeholder="e.g., 500"
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        required
      />
      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : (budgetToEdit ? 'Update Budget' : 'Save Budget')}
      </Button>
    </form>
  );
};

export default BudgetForm;