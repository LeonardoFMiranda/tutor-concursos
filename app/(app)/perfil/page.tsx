import { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import ProfileForm from "./profile-form";
import { UserCircle } from "@phosphor-icons/react/dist/ssr";

export const metadata: Metadata = {
  title: "Meu Perfil | Tutor de Concursos",
};

export default async function ProfilePage() {
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

  const initialData = {
    targetExam: profile.targetExam,
    banca: profile.banca,
    subjects: profile.subjects,
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8 flex items-center gap-3">
        <UserCircle size={40} className="text-[var(--color-primary)]" weight="duotone" />
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
            Meu Perfil
          </h1>
          <p className="text-gray-600 text-lg">
            Atualize seu foco de estudos, banca e disciplinas de interesse.
          </p>
        </div>
      </div>

      <ProfileForm initialData={initialData} />
    </div>
  );
}
