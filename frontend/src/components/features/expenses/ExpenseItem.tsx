import { formatCurrency, formatDate } from '../../../lib/utils';
import type { Expense } from '../../../types';
import Button from '../../ui/Button';

interface ExpenseItemProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseItem = ({ expense, onEdit, onDelete }: ExpenseItemProps) => {
  return (
    <div className="p-3 bg-white border-b border-gray-200">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex-grow min-w-[150px]">
          <p className="font-bold truncate">{expense.title}</p>
          <p className="text-sm text-gray-500">{expense.category}</p>
        </div>
        <div className="flex-shrink-0 text-right">
          <p className="font-bold text-red-600">{formatCurrency(expense.amount)}</p>
          <p className="text-sm text-gray-500">
            {formatDate(expense.date)}
          </p>
        </div>
        <div className="flex-shrink-0 flex items-center gap-2">
          <Button 
            variant="secondary" 
            onClick={() => onEdit(expense)}
            className="px-3 py-1 text-sm"
          >
            Edit
          </Button>
          <Button 
            variant="accent" 
            onClick={() => onDelete(expense._id)}
            className="px-3 py-1 text-sm"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ExpenseItem;