"use client";

import Link from "next/link";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ArrowRight, CheckCircle, Target } from "@phosphor-icons/react";

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

export default function RecentSessions({ sessions }: RecentSessionsProps) {
  if (sessions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 border border-gray-200 rounded-lg text-center">
        <Target size={48} weight="duotone" className="text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhuma sessão recente
        </h3>
        <p className="text-gray-500 mb-6">
          Você ainda não realizou nenhuma sessão de prática.
        </p>
        <Link href="/praticar" className="gov-btn-primary">
          Começar a Praticar
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
            <tr>
              <th scope="col" className="px-6 py-4">Matéria</th>
              <th scope="col" className="px-6 py-4">Data</th>
              <th scope="col" className="px-6 py-4 text-center">Desempenho</th>
              <th scope="col" className="px-6 py-4 text-right">Ação</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              const accuracy = session.totalAttempts > 0 
                ? (session.correctAttempts / session.totalAttempts) * 100 
                : 0;

              return (
                <tr key={session.id} className="bg-white border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {session.subject}
                  </td>
                  <td className="px-6 py-4">
                    {format(new Date(session.createdAt), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="flex-1 max-w-[100px] bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-[var(--color-primary)] h-2.5 rounded-full" 
                          style={{ width: `${accuracy}%` }}
                        ></div>
                      </div>
                      <span className="font-medium text-gray-700 min-w-[3rem] text-right">
                        {session.correctAttempts}/{session.totalQuestions}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/praticar/${session.id}`}
                      className="inline-flex items-center gap-1 font-medium text-[var(--color-primary)] hover:underline"
                    >
                      Revisar
                      <ArrowRight size={16} weight="bold" />
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
