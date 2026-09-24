"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CriarCategoriaState = {
  error: string | null;
  success: boolean;
};

export async function criarCategoria( _previousState: CriarCategoriaState, formData: FormData): Promise<CriarCategoriaState> {
  const nome = String(formData.get("nome") ?? "").trim();

  if (!nome) {
    return { error: "Informe um nome para a categoria.", success: false };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sua sessão expirou. Faça login novamente.", success: false };
  }

  const { error } = await supabase.from("categorias").insert({
    nome
  });

  if (error) {
    console.error("Erro ao criar categoria:", error);

    return {
      error: "Não foi possível cadastrar a categoria. Tente novamente.",
      success: false,
    };
  }

  revalidatePath("/categorias");

  return { error: null, success: true };
}
