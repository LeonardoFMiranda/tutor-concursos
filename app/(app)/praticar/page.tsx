import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Praticar",
};

export default function PraticarPage() {
  return (
    <div className="gov-container" style={{ padding: "48px var(--space-4)" }}>
      <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, marginBottom: 8 }}>
        Gerar Questões
      </h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        Formulário de geração de questões — em breve na Fase 3.
      </p>
    </div>
  );
}
