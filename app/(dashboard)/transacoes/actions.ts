"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CriarTransacaoState = {
  error: string | null;
  success: boolean;
};

export async function criarTransacao( _previousState: CriarTransacaoState, formData: FormData): Promise<CriarTransacaoState> {
  const descricao = String(formData.get("descricao") ?? "").trim();
  const valor = Number(String(formData.get("valor") ?? "").replace(",", "."));
  const tipo = String(formData.get("tipo") ?? "");
  const categoriaId = String(formData.get("categoriaId") ?? "").trim();
  const dataCadastro = String(formData.get("dataCadastro") ?? "").trim();

  if (!descricao) {
    return { error: "Informe uma descrição para a transação.", success: false };
  }

  if (!Number.isFinite(valor) || valor <= 0) {
    return { error: "Informe um valor válido maior que zero.", success: false };
  }

  if (tipo !== "receita" && tipo !== "despesa") {
    return { error: "Selecione o tipo da transação.", success: false };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sua sessão expirou. Faça login novamente.", success: false };
  }

  const { error } = await supabase.from("transacoes").insert({
    usuario_id: user.id,
    descricao,
    valor,
    tipo_transacao: tipo === "receita" ? 1 : 2,
    categoria_id: categoriaId || null,
    data_cadastro: dataCadastro || new Date().toISOString(),
  });

  if (error) {
    console.error("Erro ao criar transação:", error);

    return {
      error: "Não foi possível cadastrar a transação. Tente novamente.",
      success: false,
    };
  }

  revalidatePath("/transacoes");

  return { error: null, success: true };
}
