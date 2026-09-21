import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <main
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "var(--color-background)",
        padding: "var(--space-4)",
      }}
    >
      <div style={{ width: "100%", maxWidth: 480 }}>
        {/* Logo / branding */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "var(--radius-md)",
              backgroundColor: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              fontSize: "1.75rem",
            }}
          >
            📋
          </div>
          <h1
            style={{
              fontSize: "var(--font-size-2xl)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              marginBottom: 6,
            }}
          >
            Tutor de Concursos
          </h1>
          <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
            Entre na sua conta para continuar estudando
          </p>
        </div>

        <SignIn
          appearance={{
            elements: {
              card: {
                boxShadow: "var(--shadow-md)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
              },
              primaryButton: {
                backgroundColor: "var(--color-primary)",
                borderRadius: "var(--radius-sm)",
                fontWeight: 600,
              },
              formButtonPrimary: {
                backgroundColor: "var(--color-primary)",
              },
            },
          }}
        />
      </div>
    </main>
  );
}
