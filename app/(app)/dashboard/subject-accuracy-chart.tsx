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
import EmptyState from "./empty-state";
import { ChartBar } from "@phosphor-icons/react";

interface SubjectAccuracyChartProps {
  data: {
    subject: string;
    accuracy: number;
    total: number;
  }[];
}

/** Retorna cor semântica de desempenho (verde / âmbar / vermelho) */
function accuracyColor(accuracy: number): string {
  if (accuracy >= 70) return "#16a34a"; // verde
  if (accuracy >= 40) return "#d97706"; // âmbar
  return "#dc2626";                      // vermelho
}

export default function SubjectAccuracyChart({ data }: SubjectAccuracyChartProps) {
  // Só renderiza o gráfico com pelo menos 2 matérias distintas
  if (data.length < 2) {
    return (
      <EmptyState
        icon={<ChartBar size={52} weight="duotone" />}
        title="Pratique matérias diferentes para comparar seu desempenho"
        description="Realize sessões em pelo menos 2 disciplinas diferentes para ver a comparação de acertos por matéria."
        href="/praticar"
        cta="Praticar agora"
      />
    );
  }

  return (
    <div className="h-[300px] w-full bg-white p-4 border border-gray-200 rounded-xl shadow-sm">
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
            cursor={{ fill: "#F3F4F6" }}
            contentStyle={{ borderRadius: "8px", border: "1px solid #E5E7EB", boxShadow: "0 1px 2px 0 rgba(0,0,0,0.05)" }}
            formatter={(value: any, _name: any, props: any) => [
              `${Number(value).toFixed(1)}% (${props.payload.total} questões)`,
              "Taxa de Acerto",
            ]}
            labelStyle={{ color: "#374151", fontWeight: 600, marginBottom: "4px" }}
          />
          <Bar dataKey="accuracy" radius={[0, 4, 4, 0]} barSize={24}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={accuracyColor(entry.accuracy)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
