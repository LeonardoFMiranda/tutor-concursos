import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Onboarding",
};

export default function OnboardingPage() {
  return (
    <div className="gov-container" style={{ padding: "48px var(--space-4)" }}>
      <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, marginBottom: 8 }}>
        Configure seu perfil
      </h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        Formulário de onboarding — em breve na Fase 2.
      </p>
    </div>
  );
}
