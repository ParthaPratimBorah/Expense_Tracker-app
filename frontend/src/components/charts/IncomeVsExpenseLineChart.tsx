// /src/components/charts/IncomeVsExpenseLineChart.tsx

import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type ChartData = {
    name: string; // e.g., 'Jan', 'Feb'
    income: number;
    expenses: number;
};

const IncomeVsExpenseLineChart = ({ data }: { data: ChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="name"/>
          <YAxis tickFormatter={(value) => `$${value}`}/>
          <Tooltip formatter={(value) => `$${value}`}/>
          <Legend />
          <Line type="monotone" dataKey="income" stroke="#1D2B53" strokeWidth={2} name="Income" />
          <Line type="monotone" dataKey="expenses" stroke="#FF8A08" strokeWidth={2} name="Expenses" />
        </LineChart>
    </ResponsiveContainer>
  );
};

export default IncomeVsExpenseLineChart;