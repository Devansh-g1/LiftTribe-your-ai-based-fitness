
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ProgressChartProps {
  data: Array<{
    date: string;
    value: number;
  }>;
  title: string;
  unit: string;
  color: string;
}

const ProgressChart = ({ data, title, unit, color }: ProgressChartProps) => {
  return (
    <div className="card">
      <h3 className="font-bold text-lg mb-4">{title}</h3>
      <div className="h-52">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          >
            <defs>
              <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.6} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
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
              unit={unit}
            />
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
            <Tooltip
              contentStyle={{ 
                backgroundColor: '#1a1a2e', 
                borderColor: '#ffffff20',
                color: '#ededed'
              }}
              labelStyle={{ color: '#ededed' }}
            />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke={color} 
              fillOpacity={1}
              fill={`url(#gradient-${title})`}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
