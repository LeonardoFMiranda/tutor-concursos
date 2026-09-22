"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, Target } from "@phosphor-icons/react";

interface RecentSession {
  id: string;
  subject: string;
  createdAt: Date;
  correctAttempts: number;
  totalAttempts: number;
  totalQuestions: number;
}

interface RecentSessionsProps {
  sessions: RecentSession[];
}

/** Cor semântica de desempenho */
function accuracyColor(accuracy: number) {
  if (accuracy >= 70) return { bar: "#16a34a", text: "text-green-700" };
  if (accuracy >= 40) return { bar: "#d97706", text: "text-amber-700" };
  return { bar: "#dc2626", text: "text-red-700" };
}

export default function RecentSessions({ sessions }: RecentSessionsProps) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-center gap-3">
        <Target size={48} weight="duotone" className="text-gray-300" />
        <div>
          <h3 className="text-base font-semibold text-gray-700 mb-1">
            Nenhuma sessão ainda
          </h3>
          <p className="text-gray-500 text-sm">
            Você ainda não realizou nenhuma sessão de prática.
          </p>
        </div>
        <Link
          href="/praticar"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--color-primary)] border border-[var(--color-primary)] px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
        >
          Começar a Praticar
          <ArrowRight size={13} weight="bold" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-600 uppercase bg-gray-50 border-b border-gray-200 tracking-wider">
            <tr>
              <th scope="col" className="px-6 py-4">Matéria</th>
              <th scope="col" className="px-6 py-4">Data</th>
              <th scope="col" className="px-6 py-4 text-center">Desempenho</th>
              <th scope="col" className="px-6 py-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              const accuracyPct = session.totalAttempts > 0
                ? (session.correctAttempts / session.totalAttempts) * 100
                : 0;
              const color = accuracyColor(accuracyPct);

              return (
                <tr key={session.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-900">
                    {session.subject}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {format(new Date(session.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex-1 max-w-[100px] bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all"
                          style={{ width: `${accuracyPct}%`, backgroundColor: color.bar }}
                        />
                      </div>
                      <span className={`font-bold min-w-[3rem] text-right text-xs ${color.text}`}>
                        {session.correctAttempts}/{session.totalQuestions}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/praticar/${session.id}`}
                      className="inline-flex items-center gap-1 font-semibold text-[var(--color-primary)] hover:underline text-xs"
                    >
                      Revisar
                      <ArrowRight size={14} weight="bold" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
