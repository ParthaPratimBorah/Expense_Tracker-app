import ExpenseItem from './ExpenseItem';
import type { Expense } from '../../../types';

interface ExpenseListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
}

const ExpenseList = ({ expenses, onEdit, onDelete }: ExpenseListProps) => {
  if (expenses.length === 0) {
    return <p>No expenses found. Add one to get started!</p>;
  }
  
  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <ExpenseItem 
          key={expense._id} 
          expense={expense} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default ExpenseList;