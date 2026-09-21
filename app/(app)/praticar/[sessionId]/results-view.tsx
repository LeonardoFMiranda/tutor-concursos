"use client";

import { CheckCircle, XCircle, ArrowRight, ListDashes } from "@phosphor-icons/react";
import Link from "next/link";
import { Attempt } from "@prisma/client";

interface ResultsViewProps {
  total: number;
  attempts: Attempt[];
}

export default function ResultsView({ total, attempts }: ResultsViewProps) {
  const correctCount = attempts.filter((a) => a.isCorrect).length;
  const incorrectCount = attempts.length - correctCount;
  
  const percentage = Math.round((correctCount / total) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded shadow-sm w-full max-w-2xl mx-auto p-8 text-center">
      <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Sessão Concluída!</h2>
      <p className="text-gray-600 mb-8">Veja como foi o seu desempenho neste caderno de questões.</p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
        <div className="bg-blue-50 p-6 rounded-full w-40 h-40 flex flex-col items-center justify-center border-4 border-[var(--color-primary)]">
          <span className="text-4xl font-black text-[var(--color-primary)]">{percentage}%</span>
          <span className="text-sm font-bold text-[var(--color-primary)] uppercase">Acertos</span>
        </div>
        
        <div className="flex flex-col gap-4 text-left">
          <div className="flex items-center gap-3 bg-gray-50 px-6 py-4 rounded border border-gray-200">
            <ListDashes size={24} className="text-gray-500" />
            <div>
              <p className="text-sm text-gray-500 font-bold uppercase">Total</p>
              <p className="text-xl font-bold text-gray-900">{total} Questões</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-green-50 px-6 py-4 rounded border border-green-200">
            <CheckCircle size={24} weight="fill" className="text-[var(--color-success)]" />
            <div>
              <p className="text-sm text-green-700 font-bold uppercase">Acertos</p>
              <p className="text-xl font-bold text-green-900">{correctCount}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-red-50 px-6 py-4 rounded border border-red-200">
            <XCircle size={24} weight="fill" className="text-red-500" />
            <div>
              <p className="text-sm text-red-700 font-bold uppercase">Erros</p>
              <p className="text-xl font-bold text-red-900">{incorrectCount}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6 border-t border-gray-200">
        <Link
          href="/dashboard"
          className="px-8 py-3 bg-gray-100 text-gray-700 font-bold rounded hover:bg-gray-200 transition-colors"
        >
          Ir para o Dashboard
        </Link>
        <Link
          href="/praticar"
          className="flex items-center justify-center gap-2 px-8 py-3 bg-[var(--color-primary)] text-white font-bold rounded hover:bg-[var(--color-primary-dark)] transition-colors"
        >
          Gerar Novo Caderno
          <ArrowRight size={20} weight="bold" />
        </Link>
      </div>
    </div>
  );
}
