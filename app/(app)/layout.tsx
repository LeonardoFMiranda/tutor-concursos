import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { ChartBar, Target, Robot, UserCircle, Books } from "@phosphor-icons/react/dist/ssr";

// ---------------------------------------------------------------------------
// Layout das rotas protegidas — tem navbar no topo
// ---------------------------------------------------------------------------

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const profile = await db.profile.findUnique({
    where: { userId },
  });

  if (!profile) {
    redirect("/onboarding");
  }

  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1, backgroundColor: "var(--color-background)" }}>
        {children}
      </main>
      <footer
        style={{
          backgroundColor: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          padding: "12px 0",
        }}
      >
        <div className="gov-container">
          <p
            className="ai-disclaimer"
            style={{ borderRadius: "var(--radius-sm)" }}
          >
            ⚠️ Questões geradas por IA podem conter erros. Sempre confira a legislação e doutrina oficial.
          </p>
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Navbar component
// ---------------------------------------------------------------------------

function Navbar() {
  return (
    <header
      style={{
        backgroundColor: "var(--color-primary)",
        boxShadow: "var(--shadow-md)",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        className="gov-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 12,
          paddingBottom: 12,
        }}
      >
        {/* Logo */}
        <Link
          href="/dashboard"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}
        >
          <span
            style={{
              width: 36,
              height: 36,
              borderRadius: "var(--radius-sm)",
              backgroundColor: "rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.1rem",
            }}
          >
            <Books size={20} weight="duotone" />
          </span>
          <span
            style={{
              color: "white",
              fontWeight: 700,
              fontSize: "var(--font-size-base)",
              letterSpacing: "-0.01em",
            }}
          >
            Gabarita.AI
          </span>
        </Link>

        {/* Nav links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                color: "rgba(255,255,255,0.85)",
                textDecoration: "none",
                fontSize: "var(--font-size-sm)",
                fontWeight: 500,
                padding: "8px 14px",
                borderRadius: "var(--radius-sm)",
                display: "flex",
                alignItems: "center",
                gap: 6,
                transition: "background var(--transition-fast)",
              }}
            >
              <span>{link.icon}</span>
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}

          {/* Divisor */}
          <div
            style={{
              width: 1,
              height: 24,
              backgroundColor: "rgba(255,255,255,0.2)",
              margin: "0 8px",
            }}
          />

          {/* User menu */}
          <UserButton
            appearance={{
              elements: {
                avatarBox: {
                  width: 36,
                  height: 36,
                },
              },
            }}
          />
        </nav>
      </div>
    </header>
  );
}

const navLinks = [
  { href: "/dashboard", icon: <ChartBar size={20} weight="bold" />, label: "Dashboard" },
  { href: "/praticar",  icon: <Target size={20} weight="bold" />, label: "Praticar"  },
  { href: "/tutor",     icon: <Robot size={20} weight="bold" />, label: "Tutor"     },
  { href: "/perfil",    icon: <UserCircle size={20} weight="bold" />, label: "Perfil"    },
];
