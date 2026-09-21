"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface SubjectAccuracyChartProps {
  data: {
    subject: string;
    accuracy: number;
    total: number;
  }[];
}

export default function SubjectAccuracyChart({ data }: SubjectAccuracyChartProps) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 border border-gray-200 rounded-lg text-gray-500">
        Nenhum dado por matéria.
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full bg-white p-4 border border-gray-200 rounded-lg shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
          <XAxis 
            type="number"
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
          />
          <YAxis 
            dataKey="subject" 
            type="category" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#374151", fontSize: 13, fontWeight: 500 }}
            width={120}
          />
          <Tooltip
            cursor={{ fill: '#F3F4F6' }}
            contentStyle={{ borderRadius: '8px', border: '1px solid #E5E7EB', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}
            formatter={(value: any, name: any, props: any) => [
              `${Number(value).toFixed(1)}% (${props.payload.total} questões)`,
              'Taxa de Acerto'
            ]}
            labelStyle={{ color: '#374151', fontWeight: 600, marginBottom: '4px' }}
          />
          <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.accuracy >= 70 ? 'var(--color-primary)' : entry.accuracy >= 50 ? '#F59E0B' : '#EF4444'} 
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
