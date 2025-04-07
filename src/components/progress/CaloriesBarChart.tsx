
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CaloriesBarChartProps {
  data: Array<{
    date: string;
    burned: number;
    consumed: number;
  }>;
}

const CaloriesBarChart = ({ data }: CaloriesBarChartProps) => {
  return (
    <div className="card">
      <h3 className="font-bold text-lg mb-4">Calories: Burned vs Consumed</h3>
      <div className="h-60">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <XAxis 
              dataKey="date"
              tick={{ fill: '#ededed', fontSize: 10 }}
              axisLine={{ stroke: '#ffffff20' }}
              tickLine={{ stroke: '#ffffff20' }}
            />
            <YAxis 
              tick={{ fill: '#ededed', fontSize: 10 }}
              axisLine={{ stroke: '#ffffff20' }}
              tickLine={{ stroke: '#ffffff20' }}
              unit="kcal"
            />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#1a1a2e', 
                borderColor: '#ffffff20',
                color: '#ededed'
              }}
              labelStyle={{ color: '#ededed' }}
            />
            <Legend 
              wrapperStyle={{ color: '#ededed', fontSize: 12 }}
            />
            <Bar dataKey="burned" name="Burned" fill="#00dba8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="consumed" name="Consumed" fill="#ff5c98" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CaloriesBarChart;
