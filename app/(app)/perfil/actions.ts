"use server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { onboardingSchema } from "@/lib/validations/schemas";
import { revalidatePath } from "next/cache";

export async function updateProfileAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Usuário não autenticado." };
  }

  const targetExam = formData.get("targetExam") as string;
  const banca = formData.get("banca") as string;
  
  // Pegando todos os checkboxes marcados com name="subjects"
  const allSubjects = formData.getAll("subjects") as string[];

  const validationResult = onboardingSchema.safeParse({
    targetExam,
    banca,
    subjects: allSubjects,
  });

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.issues[0].message,
    };
  }

  try {
    await db.profile.update({
      where: { userId },
      data: {
        targetExam: validationResult.data.targetExam,
        banca: validationResult.data.banca,
        subjects: validationResult.data.subjects,
      },
    });

    // Revalidar as páginas que usam dados do perfil
    revalidatePath("/praticar");
    revalidatePath("/dashboard");
    revalidatePath("/perfil");

    return { success: true };
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return {
      success: false,
      error: "Ocorreu um erro ao atualizar o perfil. Tente novamente mais tarde.",
    };
  }
}
