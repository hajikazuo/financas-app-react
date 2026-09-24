"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CriarCategoriaState = {
  error: string | null;
  success: boolean;
};

async function obterUsuario() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

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
    usuario_id: user.id,
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

export async function editarCategoria(
  _previousState: CriarCategoriaState,
  formData: FormData,
): Promise<CriarCategoriaState> {
  const categoriaId = String(formData.get("categoriaId") ?? "").trim();
  const nome = String(formData.get("nome") ?? "").trim();

  if (!categoriaId) {
    return { error: "Não foi possível identificar a categoria.", success: false };
  }

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

  const { data, error } = await supabase
    .from("categorias")
    .update({ nome })
    .eq("categoria_id", categoriaId)
    .eq("usuario_id", user.id)
    .select("categoria_id")
    .maybeSingle();

  if (error) {
    console.error("Erro ao editar categoria:", error);

    return {
      error: "Não foi possível editar a categoria. Tente novamente.",
      success: false,
    };
  }

  if (!data) {
    return {
      error: "Categoria global ou sem permissão para editá-la.",
      success: false,
    };
  }

  revalidatePath("/categorias");

  return { error: null, success: true };
}

export async function deletarCategoria(
  categoriaId: string,
): Promise<CriarCategoriaState> {
  const id = categoriaId.trim();

  if (!id) {
    return { error: "Não foi possível identificar a categoria.", success: false };
  }

  const { supabase, user } = await obterUsuario();

  if (!user) {
    return { error: "Sua sessão expirou. Faça login novamente.", success: false };
  }

  const { data, error } = await supabase
    .from("categorias")
    .delete()
    .eq("categoria_id", id)
    .eq("usuario_id", user.id)
    .select("categoria_id")
    .maybeSingle();

  if (error) {
    console.error("Erro ao deletar categoria:", error);

    return {
      error: "Não foi possível excluir a categoria. Tente novamente.",
      success: false,
    };
  }

  if (!data) {
    return {
      error: "Categoria não encontrada ou sem permissão para excluí-la.",
      success: false,
    };
  }

  revalidatePath("/categorias");

  return { error: null, success: true };
}