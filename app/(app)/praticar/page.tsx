import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import PraticarForm from "./form";

export const metadata = {
  title: "Praticar | Tutor de Concursos",
};

export default async function PraticarPage() {
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
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Gerar Caderno de Questões
        </h1>
        <p className="text-gray-600 text-lg">
          Configure os parâmetros abaixo. Nossa Inteligência Artificial vai elaborar
          questões inéditas focadas na sua necessidade.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <PraticarForm
          defaultBanca={profile.banca}
          subjects={profile.subjects}
        />
      </div>
    </div>
  );
}
