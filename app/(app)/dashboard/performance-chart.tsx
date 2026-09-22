"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import EmptyState from "./empty-state";
import { ChartLine } from "@phosphor-icons/react";

interface PerformanceChartProps {
  data: {
    date: string;
    accuracy: number;
    total: number;
  }[];
}

export default function PerformanceChart({ data }: PerformanceChartProps) {
  // Só renderiza o gráfico com pelo menos 3 dias distintos de dados
  if (data.length < 3) {
    return (
      <EmptyState
        icon={<ChartLine size={52} weight="duotone" />}
        title="Continue praticando para ver sua evolução aqui"
        description="Precisamos de pelo menos 3 dias de prática nos últimos 30 dias para gerar o gráfico de evolução."
        href="/praticar"
        cta="Praticar agora"
      />
    );
  }

  return (
    <div className="h-[300px] w-full bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 12 }}
            tickFormatter={(value) => `${value}%`}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)" }}
            formatter={(value: any) => [`${Number(value).toFixed(1)}%`, "Taxa de Acerto"]}
            labelStyle={{ color: "#374151", fontWeight: 600, marginBottom: "4px" }}
          />
          <Line
            type="monotone"
            dataKey="accuracy"
            stroke="var(--color-primary)"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "#fff" }}
            activeDot={{ r: 6, fill: "var(--color-primary)" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
