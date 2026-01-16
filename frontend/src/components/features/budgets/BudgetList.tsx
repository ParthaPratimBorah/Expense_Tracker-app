import BudgetItem from './BudgetItem';
import type { Budget } from '../../../types';

interface BudgetListProps {
  budgets: (Budget & { spent: number })[];
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

const BudgetList = ({ budgets, onEdit, onDelete }: BudgetListProps) => {
  if (budgets.length === 0) {
    return <p>No budgets found. Create one to start tracking!</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget) => (
        <BudgetItem 
          key={budget._id} 
          budget={budget} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default BudgetList;