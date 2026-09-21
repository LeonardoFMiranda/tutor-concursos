import Link from "next/link";
import { Show } from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="min-h-dvh flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header
        style={{
          backgroundColor: "var(--color-primary)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div className="gov-container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            {/* Ícone estilizado */}
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "var(--radius-md)",
                backgroundColor: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ fontSize: "1.3rem" }}>📋</span>
            </div>
            <span
              style={{
                color: "white",
                fontWeight: 700,
                fontSize: "var(--font-size-lg)",
                letterSpacing: "-0.01em",
              }}
            >
              Tutor de Concursos
            </span>
          </div>

          <nav className="flex items-center gap-3">
            <Show when="signed-out">
              <Link
                href="/sign-in"
                style={{
                  color: "rgba(255,255,255,0.85)",
                  textDecoration: "none",
                  fontSize: "var(--font-size-sm)",
                  fontWeight: 500,
                  padding: "8px 16px",
                  borderRadius: "var(--radius-sm)",
                  transition: "background var(--transition-fast)",
                }}
              >
                Entrar
              </Link>
              <Link
                href="/sign-up"
                style={{
                  color: "var(--color-primary)",
                  backgroundColor: "white",
                  textDecoration: "none",
                  fontSize: "var(--font-size-sm)",
                  fontWeight: 600,
                  padding: "8px 20px",
                  borderRadius: "var(--radius-sm)",
                  transition: "opacity var(--transition-fast)",
                }}
              >
                Criar conta
              </Link>
            </Show>
            <Show when="signed-in">
              <Link
                href="/dashboard"
                style={{
                  color: "white",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  textDecoration: "none",
                  fontSize: "var(--font-size-sm)",
                  fontWeight: 600,
                  padding: "8px 20px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Ir ao Dashboard
              </Link>
            </Show>
          </nav>
        </div>
      </header>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <main className="flex-1">
        <section
          style={{
            background:
              "linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 60%, var(--color-primary-light) 100%)",
            padding: "80px 0 96px",
          }}
        >
          <div className="gov-container text-center">
            <div
              className="animate-fade-in"
              style={{ maxWidth: 720, margin: "0 auto" }}
            >
              <span
                style={{
                  display: "inline-block",
                  backgroundColor: "rgba(255,255,255,0.15)",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "var(--font-size-sm)",
                  fontWeight: 600,
                  padding: "6px 16px",
                  borderRadius: "var(--radius-full)",
                  marginBottom: 24,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                ✦ Powered by IA
              </span>

              <h1
                style={{
                  color: "white",
                  fontSize: "clamp(2rem, 5vw, 3.25rem)",
                  fontWeight: 800,
                  lineHeight: 1.15,
                  marginBottom: 24,
                  letterSpacing: "-0.02em",
                }}
              >
                Prepare-se para concursos
                <br />
                <span
                  style={{
                    color: "#ffcd07",
                  }}
                >
                  com inteligência artificial
                </span>
              </h1>

              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "var(--font-size-lg)",
                  lineHeight: 1.7,
                  marginBottom: 40,
                }}
              >
                Gere questões personalizadas por matéria e banca, resolva com
                correção imediata e tire dúvidas com um tutor IA disponível
                24/7. Tudo adaptado ao seu concurso-alvo.
              </p>

              <div
                style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
              >
                <Show when="signed-out">
                  <Link
                    href="/sign-up"
                    style={{
                      backgroundColor: "#ffcd07",
                      color: "#1b1b1b",
                      fontWeight: 700,
                      fontSize: "var(--font-size-base)",
                      padding: "14px 32px",
                      borderRadius: "var(--radius-sm)",
                      textDecoration: "none",
                      transition: "transform var(--transition-fast), box-shadow var(--transition-fast)",
                      boxShadow: "0 4px 16px rgba(255,205,7,0.35)",
                    }}
                  >
                    Começar gratuitamente →
                  </Link>
                  <Link
                    href="/sign-in"
                    style={{
                      color: "white",
                      border: "2px solid rgba(255,255,255,0.4)",
                      fontWeight: 600,
                      fontSize: "var(--font-size-base)",
                      padding: "14px 32px",
                      borderRadius: "var(--radius-sm)",
                      textDecoration: "none",
                    }}
                  >
                    Já tenho conta
                  </Link>
                </Show>
                <Show when="signed-in">
                  <Link
                    href="/dashboard"
                    style={{
                      backgroundColor: "#ffcd07",
                      color: "#1b1b1b",
                      fontWeight: 700,
                      fontSize: "var(--font-size-base)",
                      padding: "14px 32px",
                      borderRadius: "var(--radius-sm)",
                      textDecoration: "none",
                    }}
                  >
                    Acessar meu Dashboard →
                  </Link>
                </Show>
              </div>
            </div>
          </div>
        </section>

        {/* ── Funcionalidades ─────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--color-surface)",
            padding: "80px 0",
          }}
        >
          <div className="gov-container">
            <h2
              style={{
                textAlign: "center",
                fontSize: "var(--font-size-2xl)",
                fontWeight: 700,
                marginBottom: 12,
                color: "var(--color-text-primary)",
              }}
            >
              Tudo que você precisa para passar
            </h2>
            <p
              style={{
                textAlign: "center",
                color: "var(--color-text-muted)",
                marginBottom: 56,
                fontSize: "var(--font-size-lg)",
              }}
            >
              Do zero à aprovação com suporte de IA em cada etapa
            </p>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: 24,
              }}
            >
              {features.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </div>
        </section>

        {/* ── Bancas suportadas ───────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--color-background)",
            padding: "60px 0",
          }}
        >
          <div className="gov-container text-center">
            <p
              style={{
                color: "var(--color-text-muted)",
                fontSize: "var(--font-size-sm)",
                fontWeight: 600,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                marginBottom: 24,
              }}
            >
              Bancas suportadas
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 12,
                justifyContent: "center",
              }}
            >
              {["CEBRASPE", "FGV", "FCC", "VUNESP", "IBFC"].map((banca) => (
                <span
                  key={banca}
                  style={{
                    padding: "8px 20px",
                    borderRadius: "var(--radius-full)",
                    border: "2px solid var(--color-border)",
                    fontSize: "var(--font-size-sm)",
                    fontWeight: 700,
                    color: "var(--color-text-secondary)",
                    backgroundColor: "var(--color-surface)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {banca}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA Final ───────────────────────────────────────────────────── */}
        <section
          style={{
            backgroundColor: "var(--color-primary)",
            padding: "72px 0",
          }}
        >
          <div className="gov-container text-center">
            <h2
              style={{
                color: "white",
                fontSize: "var(--font-size-2xl)",
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              Comece a estudar agora mesmo
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.8)",
                marginBottom: 40,
                fontSize: "var(--font-size-lg)",
              }}
            >
              Crie sua conta gratuita e gere sua primeira sessão de questões em
              menos de 1 minuto.
            </p>
            <Show when="signed-out">
              <Link
                href="/sign-up"
                style={{
                  display: "inline-block",
                  backgroundColor: "white",
                  color: "var(--color-primary)",
                  fontWeight: 700,
                  fontSize: "var(--font-size-base)",
                  padding: "14px 40px",
                  borderRadius: "var(--radius-sm)",
                  textDecoration: "none",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                Criar conta grátis
              </Link>
            </Show>
            <Show when="signed-in">
              <Link
                href="/praticar"
                style={{
                  display: "inline-block",
                  backgroundColor: "white",
                  color: "var(--color-primary)",
                  fontWeight: 700,
                  fontSize: "var(--font-size-base)",
                  padding: "14px 40px",
                  borderRadius: "var(--radius-sm)",
                  textDecoration: "none",
                }}
              >
                Gerar questões agora
              </Link>
            </Show>
          </div>
        </section>
      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer
        style={{
          backgroundColor: "var(--color-primary-dark)",
          padding: "32px 0",
        }}
      >
        <div className="gov-container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "var(--font-size-sm)",
              }}
            >
              © {new Date().getFullYear()} Tutor de Concursos. Projeto de portfólio.
            </p>
            <p
              style={{
                color: "rgba(255,255,255,0.5)",
                fontSize: "var(--font-size-xs)",
              }}
            >
              ⚠️ Questões geradas por IA podem conter erros. Confira sempre a legislação oficial.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Feature Card Component
// ---------------------------------------------------------------------------

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div
      className="transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-default"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        padding: "28px 24px",
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: "var(--radius-md)",
          backgroundColor: "var(--color-primary-lighter)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "1.5rem",
          marginBottom: 16,
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontWeight: 700,
          fontSize: "var(--font-size-lg)",
          marginBottom: 8,
          color: "var(--color-text-primary)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          color: "var(--color-text-muted)",
          fontSize: "var(--font-size-sm)",
          lineHeight: 1.6,
        }}
      >
        {description}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Features data
// ---------------------------------------------------------------------------

const features = [
  {
    icon: "🎯",
    title: "Questões por banca",
    description:
      "CEBRASPE (Certo/Errado), FGV, FCC, VUNESP e outras. Cada banca tem seu estilo e a IA sabe a diferença.",
  },
  {
    icon: "✅",
    title: "Correção imediata",
    description:
      "Confirme sua resposta e veja na hora se acertou, qual era o gabarito e uma explicação detalhada.",
  },
  {
    icon: "🤖",
    title: "Tutor com IA",
    description:
      "Não entendeu? Abra o chat com o tutor direto da questão e tire todas as suas dúvidas com streaming em tempo real.",
  },
  {
    icon: "📊",
    title: "Dashboard de evolução",
    description:
      "Acompanhe sua taxa de acerto por matéria, evolução diária e histórico de sessões.",
  },
  {
    icon: "⚙️",
    title: "Personalizado para você",
    description:
      "Configure seu concurso-alvo, banca e matérias de interesse. As questões são geradas sob medida.",
  },
  {
    icon: "🚩",
    title: "Reporte problemas",
    description:
      "IA pode errar. Sinalize questões com problemas para manter a qualidade do seu estudo.",
  },
];
