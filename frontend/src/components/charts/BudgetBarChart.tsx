// /src/components/charts/BudgetBarChart.tsx

import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ChartData = {
  name: string;
  budget: number;
  spent: number;
};

const BudgetBarChart = ({ data }: { data: ChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(value) => `$${value}`} />
        <Tooltip formatter={(value) => `$${value}`} />
        <Legend />
        <Bar dataKey="budget" fill="#1D2B53" name="Budget Limit" />
        <Bar dataKey="spent" fill="#FF8A08" name="Amount Spent" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BudgetBarChart;