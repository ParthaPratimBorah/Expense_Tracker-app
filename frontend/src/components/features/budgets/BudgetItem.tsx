import Card from '../../ui/Card';
import Button from '../../ui/Button';
import { formatCurrency } from '../../../lib/utils';
import type { Budget } from '../../../types';

interface BudgetItemProps {
  budget: Budget & { spent: number };
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

const BudgetItem = ({ budget, onEdit, onDelete }: BudgetItemProps) => {
  const { limit, spent, category, _id } = budget;
  const remaining = limit - spent;
  const progress = (spent / limit) * 100;

  return (
    <Card className="flex flex-col justify-between">
      <div>
        <div className="flex justify-between font-bold">
          <span>{category}</span>
          <span>{formatCurrency(spent)} / {formatCurrency(limit)}</span>
        </div>
        <div className="w-full mt-2 bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-secondary h-2.5 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className={`mt-2 text-sm text-right ${remaining < 0 ? 'text-red-500' : 'text-gray-500'}`}>
          {remaining >= 0 ? `${formatCurrency(remaining)} remaining` : `${formatCurrency(Math.abs(remaining))} over budget`}
        </p>
      </div>
      <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
        <Button variant="secondary" onClick={() => onEdit(budget)}>Edit</Button>
        <Button variant="accent" onClick={() => onDelete(_id)}>Delete</Button>
      </div>
    </Card>
  );
};

export default BudgetItem;