import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function DashboardPage() {
  return (
    <div className="gov-container" style={{ padding: "48px var(--space-4)" }}>
      <h1 style={{ fontSize: "var(--font-size-2xl)", fontWeight: 700, marginBottom: 8 }}>
        Dashboard
      </h1>
      <p style={{ color: "var(--color-text-muted)" }}>
        Seu painel de evolução — em breve na Fase 6.
      </p>
    </div>
  );
}
