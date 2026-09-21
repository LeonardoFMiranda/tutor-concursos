"use client";

import { useState } from "react";
import { Spinner, Plus, Trash } from "@phosphor-icons/react";
import { updateProfileAction } from "./actions";

interface ProfileFormProps {
  initialData: {
    targetExam: string;
    banca: string;
    subjects: string[];
  };
}

const BANCAS = ["CEBRASPE", "FGV", "FCC", "VUNESP", "IBFC", "OUTRA"];

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isPending, setIsPending] = useState(false);
  const [customSubject, setCustomSubject] = useState("");
  const [subjects, setSubjects] = useState<string[]>([...initialData.subjects]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsPending(true);
    setError(null);
    setSuccess(false);

    if (subjects.length === 0) {
      setError("Selecione ou adicione pelo menos uma disciplina.");
      setIsPending(false);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const result = await updateProfileAction(formData);

    if (result && !result.success) {
      setError(result.error || "Ocorreu um erro desconhecido.");
    } else {
      setSuccess(true);
      // Esconder a mensagem de sucesso depois de 3 segundos
      setTimeout(() => setSuccess(false), 3000);
    }
    
    setIsPending(false);
  }

  const addCustomSubject = () => {
    if (customSubject.trim() && !subjects.includes(customSubject.trim())) {
      setSubjects([...subjects, customSubject.trim()]);
      setCustomSubject("");
    }
  };

  const removeSubject = (subjectToRemove: string) => {
    setSubjects(subjects.filter((s) => s !== subjectToRemove));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 font-medium text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 font-medium text-sm">
          Perfil atualizado com sucesso!
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
            defaultValue={initialData.targetExam}
            placeholder="Ex: Auditor da Receita Federal, PF, PRF..."
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
          />
        </div>

        {/* Banca Organizadora */}
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
            defaultValue={initialData.banca}
            className="w-full px-4 py-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all bg-white"
          >
            {BANCAS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        {/* Disciplinas Foco */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">
            Disciplinas Foco <span className="text-red-500">*</span>
          </label>
          <p className="text-xs text-gray-500 mb-4">
            Gerencie as matérias que você quer estudar.
          </p>

          <div className="space-y-2 mb-4">
            {subjects.map((subject) => (
              <div
                key={subject}
                className="flex items-center justify-between p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="hidden"
                    name="subjects"
                    value={subject}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {subject}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeSubject(subject)}
                  className="text-gray-400 hover:text-red-500 p-1 rounded transition-colors"
                  aria-label="Remover disciplina"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
            
            {subjects.length === 0 && (
              <div className="text-sm text-gray-500 italic p-3 text-center border border-dashed border-gray-300 rounded">
                Nenhuma disciplina selecionada. Adicione pelo menos uma.
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={customSubject}
              onChange={(e) => setCustomSubject(e.target.value)}
              placeholder="Adicionar nova disciplina..."
              className="flex-1 px-4 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all text-sm"
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
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded font-bold text-sm transition-colors border border-gray-300 flex items-center gap-1"
            >
              <Plus size={16} weight="bold" />
              Adicionar
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 bg-[var(--color-primary)] text-white font-bold text-lg px-6 py-4 rounded hover:bg-[var(--color-primary-dark)] transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
          >
            {isPending ? (
              <>
                <Spinner size={24} className="animate-spin" />
                Salvando alterações...
              </>
            ) : (
              "Salvar Alterações"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
