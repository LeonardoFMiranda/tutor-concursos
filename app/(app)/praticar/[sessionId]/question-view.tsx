"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Question } from "@prisma/client";
import { submitAnswerAction, reportQuestionAction } from "./actions";
import { CheckCircle, XCircle, Flag, Student, ArrowRight, Spinner } from "@phosphor-icons/react";
import Link from "next/link";
import clsx from "clsx";

interface QuestionViewProps {
  question: Question;
  currentIndex: number;
  totalQuestions: number;
}

export default function QuestionView({
  question,
  currentIndex,
  totalQuestions,
}: QuestionViewProps) {
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Após responder
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // Parse opções
  const options = question.options as { key: string; text: string }[];

  async function handleConfirm() {
    if (!selectedOption || hasAnswered || isSubmitting) return;

    setIsSubmitting(true);
    setActionError(null);
    const result = await submitAnswerAction(question.id, selectedOption);
    setIsSubmitting(false);

    if (result.success) {
      setHasAnswered(true);
      setIsCorrect(result.isCorrect || false);
    } else {
      setActionError(result.error || "Falha ao salvar a resposta.");
    }
  }

  async function handleReport() {
    if (isReporting) return;
    setIsReporting(true);
    setActionError(null);
    const result = await reportQuestionAction(question.id);
    setIsReporting(false);
    if (!result.success) {
      setActionError(result.error || "Falha ao reportar.");
    }
  }

  function handleNextQuestion() {
    // router.refresh() revalida os Server Components sem reload de página inteira,
    // evitando estados inconsistentes com auth e Error Boundary.
    router.refresh();
  }

  return (
    <div className="bg-white border border-gray-200 rounded shadow-sm w-full">
      {actionError && (
        <div className="mx-4 mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm font-medium rounded">
          {actionError}
        </div>
      )}
      {/* HEADER DA QUESTÃO */}
      <div className="bg-gray-50 border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">
            Questão {currentIndex} de {totalQuestions}
          </span>
          <h2 className="text-sm font-semibold text-gray-700 mt-1">
            {question.banca} • {question.subject}
            {question.topic ? ` • ${question.topic}` : ""}
          </h2>
        </div>
        <div className="text-xs font-bold bg-gray-200 text-gray-600 px-3 py-1 rounded">
          {question.difficulty}
        </div>
      </div>

      {/* ENUNCIADO */}
      <div className="p-4 sm:p-6">
        <p className="text-lg text-gray-900 leading-relaxed font-medium mb-8 whitespace-pre-wrap">
          {question.statement}
        </p>

        {/* ALTERNATIVAS */}
        <div className="space-y-3 mb-8">
          {question.style === "MULTIPLE_CHOICE" && options.length > 0 && (
            options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              const isActualCorrect = question.correctAnswer === opt.key;
              
              let styleClass = "border-gray-300 hover:border-[var(--color-primary)] hover:bg-blue-50 text-gray-700 cursor-pointer";
              
              if (hasAnswered) {
                if (isActualCorrect) {
                  styleClass = "border-[var(--color-success)] bg-green-50 text-green-900";
                } else if (isSelected && !isActualCorrect) {
                  styleClass = "border-red-500 bg-red-50 text-red-900";
                } else {
                  styleClass = "border-gray-200 text-gray-400 opacity-50 cursor-default";
                }
              } else if (isSelected) {
                styleClass = "border-[var(--color-primary)] bg-blue-50 ring-1 ring-[var(--color-primary)]";
              }

              return (
                <div
                  key={opt.key}
                  onClick={() => !hasAnswered && setSelectedOption(opt.key)}
                  className={clsx(
                    "w-full text-left p-4 rounded border transition-all flex gap-4",
                    styleClass
                  )}
                >
                  <span className="font-bold flex-shrink-0">{opt.key})</span>
                  <span>{opt.text}</span>
                </div>
              );
            })
          )}

          {question.style === "CERTO_ERRADO" && (
            <div className="flex flex-col sm:flex-row gap-4">
              {["CERTO", "ERRADO"].map((opt) => {
                const isSelected = selectedOption === opt;
                const isActualCorrect = question.correctAnswer === opt;
                
                let styleClass = "border-gray-300 hover:border-[var(--color-primary)] hover:bg-blue-50 text-gray-700 cursor-pointer";
                
                if (hasAnswered) {
                  if (isActualCorrect) {
                    styleClass = "border-[var(--color-success)] bg-green-50 text-green-900";
                  } else if (isSelected && !isActualCorrect) {
                    styleClass = "border-red-500 bg-red-50 text-red-900";
                  } else {
                    styleClass = "border-gray-200 text-gray-400 opacity-50 cursor-default";
                  }
                } else if (isSelected) {
                  styleClass = "border-[var(--color-primary)] bg-blue-50 ring-1 ring-[var(--color-primary)]";
                }

                return (
                  <div
                    key={opt}
                    onClick={() => !hasAnswered && setSelectedOption(opt)}
                    className={clsx(
                      "flex-1 text-center p-4 rounded border font-bold transition-all",
                      styleClass
                    )}
                  >
                    {opt}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* FEEDBACK E EXPLICAÇÃO */}
        {hasAnswered && (
          <div className="mb-8 animate-in fade-in slide-in-from-top-4">
            <div className={clsx(
              "flex items-center gap-2 p-4 rounded-t border-b-0 border font-bold text-lg",
              isCorrect ? "bg-green-100 border-[var(--color-success)] text-green-800" : "bg-red-100 border-red-500 text-red-800"
            )}>
              {isCorrect ? (
                <><CheckCircle size={24} weight="fill" /> Você acertou!</>
              ) : (
                <><XCircle size={24} weight="fill" /> Você errou!</>
              )}
            </div>
            <div className={clsx(
              "p-5 rounded-b border border-t-0",
              isCorrect ? "border-[var(--color-success)] bg-green-50" : "border-red-500 bg-red-50"
            )}>
              <h3 className="font-bold text-gray-900 mb-2">Comentário do Professor (IA)</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap text-sm">
                {question.explanation}
              </p>
            </div>
          </div>
        )}

        {/* BOTÕES DE AÇÃO */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
          <div className="flex gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleReport}
              disabled={isReporting || question.reported}
              className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors disabled:opacity-50"
            >
              <Flag size={18} />
              {question.reported ? "Reportada" : "Reportar Erro"}
            </button>
            
            {hasAnswered && (
              <Link
                href={`/tutor`}
                className="flex items-center gap-2 text-sm text-[var(--color-primary)] hover:underline font-semibold ml-4"
              >
                <Student size={18} />
                Não entendi
              </Link>
            )}
          </div>

          {!hasAnswered ? (
            <button
              onClick={handleConfirm}
              disabled={!selectedOption || isSubmitting}
              className="w-full sm:w-auto bg-[var(--color-primary)] text-white px-8 py-3 rounded font-bold hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[200px]"
            >
              {isSubmitting ? <Spinner size={20} className="animate-spin" /> : "Confirmar Resposta"}
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="w-full sm:w-auto bg-[var(--color-success)] text-white px-8 py-3 rounded font-bold hover:brightness-110 transition-colors flex items-center justify-center gap-2 min-w-[200px]"
            >
              Próxima Questão
              <ArrowRight size={20} weight="bold" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
