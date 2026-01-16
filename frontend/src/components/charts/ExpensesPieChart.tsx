import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../lib/utils';

type ChartData = {
  name: string;
  value: number;
};

const COLORS = ['#1D2B53', '#FFB534', '#FF8A08', '#7E2553', '#008080'];

const ExpensesPieChart = ({ data }: { data: ChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => formatCurrency(value as number)} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default ExpensesPieChart;