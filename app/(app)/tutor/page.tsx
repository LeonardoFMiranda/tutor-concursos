import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tutor IA",
};

export default function TutorPage() {
  return (
    <div className="gov-container" style={{ padding: "48px var(--space-4)" }}>
      <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, marginBottom: 8 }}>
        Tutor IA
      </h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        Chat com tutor inteligente — em breve na Fase 5.
      </p>
    </div>
  );
}
