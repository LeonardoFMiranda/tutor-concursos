"use client";

import { useState } from "react";
import { generatePracticeSessionAction } from "./actions";
import { Spinner, MagicWand } from "@phosphor-icons/react";
import { Banca } from "@prisma/client";

interface PraticarFormProps {
  defaultBanca: Banca;
  subjects: string[];
}

const BANCAS = ["CEBRASPE", "FGV", "FCC", "VUNESP", "IBFC", "OUTRA"];
const DIFFICULTIES = [
  { value: "FACIL", label: "Fácil" },
  { value: "MEDIO", label: "Médio" },
  { value: "DIFICIL", label: "Difícil" },
];

export default function PraticarForm({
  defaultBanca,
  subjects,
}: PraticarFormProps) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await generatePracticeSessionAction(formData);

    if (result && !result.success) {
      setError(result.error);
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-medium text-sm rounded">
          {error}
        </div>
      )}

      {/* Matéria */}
      <div>
        <label
          htmlFor="subject"
          className="block text-sm font-bold text-gray-700 mb-1"
        >
          Disciplina <span className="text-red-500">*</span>
        </label>
        <select
          id="subject"
          name="subject"
          required
          defaultValue={subjects[0] || ""}
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white"
        >
          <option value="" disabled>
            Selecione a disciplina
          </option>
          {subjects.map((sub) => (
            <option key={sub} value={sub}>
              {sub}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Essas são as disciplinas que você configurou no seu perfil.
        </p>
      </div>

      {/* Assunto (Opcional) */}
      <div>
        <label
          htmlFor="topic"
          className="block text-sm font-bold text-gray-700 mb-1"
        >
          Assunto Específico <span className="text-gray-400 font-normal">(Opcional)</span>
        </label>
        <input
          type="text"
          id="topic"
          name="topic"
          placeholder="Ex: Atos Administrativos, Crase, Direitos Fundamentais..."
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
        />
        <p className="text-xs text-gray-500 mt-1">
          Deixe em branco para gerar questões variadas da disciplina.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Banca */}
        <div>
          <label
            htmlFor="banca"
            className="block text-sm font-bold text-gray-700 mb-1"
          >
            Banca Organizadora <span className="text-red-500">*</span>
          </label>
          <select
            id="banca"
            name="banca"
            required
            defaultValue={defaultBanca}
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white"
          >
            {BANCAS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Dificuldade */}
        <div>
          <label
            htmlFor="difficulty"
            className="block text-sm font-bold text-gray-700 mb-1"
          >
            Dificuldade <span className="text-red-500">*</span>
          </label>
          <select
            id="difficulty"
            name="difficulty"
            required
            defaultValue="MEDIO"
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white"
          >
            {DIFFICULTIES.map((d) => (
              <option key={d.value} value={d.value}>
                {d.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quantidade */}
      <div>
        <label
          htmlFor="quantity"
          className="block text-sm font-bold text-gray-700 mb-1"
        >
          Quantidade de Questões <span className="text-red-500">*</span>
        </label>
        <select
          id="quantity"
          name="quantity"
          required
          defaultValue="5"
          className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white"
        >
          {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num} questões
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          A geração pode levar alguns segundos dependendo da quantidade escolhida.
        </p>
      </div>

      <div className="pt-6 border-t border-gray-200">
        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-bold text-lg px-6 py-4 rounded hover:bg-[var(--color-primary-dark)] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
        >
          {isPending ? (
            <>
              <Spinner size={24} className="animate-spin" />
              Gerando com Inteligência Artificial...
            </>
          ) : (
            <>
              <MagicWand size={24} weight="fill" />
              Gerar Caderno
            </>
          )}
        </button>
      </div>
    </form>
  );
}
