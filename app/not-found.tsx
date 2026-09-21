"use client";

import Link from "next/link";
import { WarningCircle } from "@phosphor-icons/react";

export default function NotFound() {
  return (
    <div className="gov-container flex flex-col items-center justify-center min-h-[70vh] text-center" style={{ padding: "48px var(--space-4)" }}>
      <WarningCircle size={80} weight="duotone" className="text-gray-400 mb-6" />
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Página não encontrada
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto">
        Desculpe, não conseguimos encontrar a página que você está procurando. Ela pode ter sido removida, renomeada ou está temporariamente indisponível.
      </p>
      <Link href="/dashboard" className="gov-btn-primary text-lg px-8 py-3">
        Voltar ao Início
      </Link>
    </div>
  );
}
