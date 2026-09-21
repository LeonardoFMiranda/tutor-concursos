"use client";

import { useState } from "react";
import { Books, Spinner } from "@phosphor-icons/react";
import { createProfileAction } from "./actions";

const DEFAULT_SUBJECTS = [
  "Língua Portuguesa",
  "Raciocínio Lógico Matemático",
  "Informática",
  "Direito Constitucional",
  "Direito Administrativo",
];

const BANCAS = ["CEBRASPE", "FGV", "FCC", "VUNESP", "IBFC", "OUTRA"];

export default function OnboardingPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [customSubject, setCustomSubject] = useState("");
  const [subjects, setSubjects] = useState<string[]>([...DEFAULT_SUBJECTS]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await createProfileAction(formData);

    if (result && !result.success) {
      setError(result.error);
      setIsPending(false);
    }
  }

  const addCustomSubject = () => {
    if (customSubject.trim() && !subjects.includes(customSubject.trim())) {
      setSubjects([...subjects, customSubject.trim()]);
      setCustomSubject("");
    }
  };

  return (
    <div className="min-h-dvh bg-[var(--color-background)] flex flex-col font-sans">
      {/* ── Barra Brasil (Placeholder) ─────────────────────────────────────── */}
      <div className="bg-[#f2f2f2] border-b border-[#e6e6e6] text-[#333] text-xs font-bold py-1 px-4 sm:px-8">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <span>BRASIL</span>
        </div>
      </div>

      {/* ── Header Minimalista ─────────────────────────────────────────────── */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between py-4 px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <Books size={28} color="var(--color-primary)" weight="bold" />
            <span className="text-[var(--color-primary)] font-extrabold text-xl tracking-tight">
              Gabarita.AI
            </span>
          </div>
        </div>
      </header>

      {/* ── Conteúdo Principal ─────────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 md:p-10 rounded shadow-md border border-gray-200 max-w-2xl w-full my-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            Configuração Inicial
          </h1>
          <p className="text-gray-600 mb-8 font-medium">
            Precisamos saber qual é o seu foco de estudos atual para gerar questões
            alinhadas ao seu objetivo.
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-medium text-sm">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-6">
            {/* Concurso Alvo */}
            <div>
              <label
                htmlFor="targetExam"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Concurso Alvo <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="targetExam"
                name="targetExam"
                required
                placeholder="Ex: Auditor da Receita Federal, PF, PRF..."
                className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
              />
            </div>

            {/* Banca */}
            <div>
              <label
                htmlFor="banca"
                className="block text-sm font-bold text-gray-700 mb-1"
              >
                Banca Organizadora Principal <span className="text-red-500">*</span>
              </label>
              <select
                id="banca"
                name="banca"
                required
                defaultValue=""
                className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white"
              >
                <option value="" disabled>
                  Selecione a banca
                </option>
                {BANCAS.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Disciplinas */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">
                Disciplinas do Edital <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-500 mb-4 font-medium">
                Selecione ou adicione as matérias que você irá estudar.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                {subjects.map((sub) => (
                  <label
                    key={sub}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="subjects"
                      value={sub}
                      defaultChecked={DEFAULT_SUBJECTS.includes(sub)}
                      className="w-5 h-5 accent-[var(--color-primary)] rounded"
                    />
                    <span className="text-sm font-semibold text-gray-700">
                      {sub}
                    </span>
                  </label>
                ))}
              </div>

              {/* Adicionar Disciplina */}
              <div className="flex gap-2">
                <input
                  type="text"
                  name="customSubject"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  placeholder="Adicionar outra disciplina (opcional)"
                  className="flex-1 px-4 py-2 text-sm rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addCustomSubject();
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addCustomSubject}
                  className="px-4 py-2 bg-gray-100 text-[var(--color-primary)] font-bold text-sm rounded border border-gray-300 hover:bg-gray-200 transition-colors"
                >
                  Adicionar
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 bg-[var(--color-success)] text-white font-bold text-lg px-6 py-4 rounded hover:brightness-110 transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
              >
                {isPending ? (
                  <>
                    <Spinner size={24} className="animate-spin" />
                    Salvando Perfil...
                  </>
                ) : (
                  "Finalizar Cadastro e Começar"
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
