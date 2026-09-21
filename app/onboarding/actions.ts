"use server";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { onboardingSchema } from "@/lib/validations/schemas";
import { revalidatePath } from "next/cache";

export async function createProfileAction(formData: FormData) {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Usuário não autenticado." };
  }

  // O formData.getAll retorna todas as checkboxes com name="subjects" selecionadas
  const targetExam = formData.get("targetExam") as string;
  const banca = formData.get("banca") as string;
  const subjects = formData.getAll("subjects") as string[];

  // Adicionamos a disciplina customizada se o usuário digitou mas esqueceu de apertar no botão "Adicionar"
  const customSubject = formData.get("customSubject") as string;
  const allSubjects = [...subjects];
  if (customSubject && customSubject.trim() !== "") {
    if (!allSubjects.includes(customSubject.trim())) {
      allSubjects.push(customSubject.trim());
    }
  }

  const validationResult = onboardingSchema.safeParse({
    targetExam,
    banca,
    subjects: allSubjects,
  });

  if (!validationResult.success) {
    return {
      success: false,
      error: validationResult.error.errors[0].message,
    };
  }

  try {
    await db.profile.create({
      data: {
        userId,
        targetExam: validationResult.data.targetExam,
        banca: validationResult.data.banca,
        subjects: validationResult.data.subjects,
      },
    });
  } catch (error) {
    console.error("Erro ao criar perfil:", error);
    return { success: false, error: "Falha ao criar o perfil." };
  }

  // Atualiza o cache do layout e redireciona
  revalidatePath("/", "layout");
  redirect("/dashboard");
}
