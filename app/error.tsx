"use client";

import { useEffect } from "react";
import { Warning } from "@phosphor-icons/react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Pode logar o erro num serviço como Sentry aqui
    console.error("Erro capturado:", error);
  }, [error]);

  return (
    <div className="gov-container flex flex-col items-center justify-center min-h-[70vh] text-center" style={{ padding: "48px var(--space-4)" }}>
      <Warning size={80} weight="duotone" className="text-red-500 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Ocorreu um erro inesperado
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
        Pedimos desculpas pelo transtorno. Tente carregar a página novamente.
      </p>
      <button
        onClick={() => reset()}
        className="gov-btn-primary text-lg px-8 py-3"
      >
        Tentar Novamente
      </button>
    </div>
  );
}
