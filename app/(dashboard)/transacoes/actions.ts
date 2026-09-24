"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CriarTransacaoState = {
  error: string | null;
  success: boolean;
};

type DadosTransacao = {
  descricao: string;
  valor: number;
  tipo: "receita" | "despesa";
  categoriaId: string;
  dataCadastro: string;
};

function lerDadosTransacao(formData: FormData):
  | { dados: DadosTransacao; error: null }
  | { dados: null; error: string } {
  const descricao = String(formData.get("descricao") ?? "").trim();
  const valor = Number(String(formData.get("valor") ?? "").replace(",", "."));
  const tipo = String(formData.get("tipo") ?? "");
  const categoriaId = String(formData.get("categoriaId") ?? "").trim();
  const dataCadastro = String(formData.get("dataCadastro") ?? "").trim();

  if (!descricao) {
    return { dados: null, error: "Informe uma descrição para a transação." };
  }

  if (!Number.isFinite(valor) || valor <= 0) {
    return { dados: null, error: "Informe um valor válido maior que zero." };
  }

  if (tipo !== "receita" && tipo !== "despesa") {
    return { dados: null, error: "Selecione o tipo da transação." };
  }

  return {
    dados: { descricao, valor, tipo, categoriaId, dataCadastro },
    error: null,
  };
}

async function obterUsuario() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabase, user };
}

export async function criarTransacao(
  _previousState: CriarTransacaoState,
  formData: FormData,
): Promise<CriarTransacaoState> {
  const resultado = lerDadosTransacao(formData);

  if (!resultado.dados) {
    return { error: resultado.error, success: false };
  }

  const { dados } = resultado;
  const { supabase, user } = await obterUsuario();

  if (!user) {
    return { error: "Sua sessão expirou. Faça login novamente.", success: false };
  }

  const { error } = await supabase.from("transacoes").insert({
    usuario_id: user.id,
    descricao: dados.descricao,
    valor: dados.valor,
    tipo_transacao: dados.tipo === "receita" ? 1 : 2,
    categoria_id: dados.categoriaId || null,
    data_cadastro: dados.dataCadastro || new Date().toISOString(),
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

export async function editarTransacao(
  _previousState: CriarTransacaoState,
  formData: FormData,
): Promise<CriarTransacaoState> {
  const transacaoId = String(formData.get("transacaoId") ?? "").trim();

  if (!transacaoId) {
    return { error: "Não foi possível identificar a transação.", success: false };
  }

  const resultado = lerDadosTransacao(formData);

  if (!resultado.dados) {
    return { error: resultado.error, success: false };
  }

  const { dados } = resultado;
  const { supabase, user } = await obterUsuario();

  if (!user) {
    return { error: "Sua sessão expirou. Faça login novamente.", success: false };
  }

  const { data, error } = await supabase
    .from("transacoes")
    .update({
      descricao: dados.descricao,
      valor: dados.valor,
      tipo_transacao: dados.tipo === "receita" ? 1 : 2,
      categoria_id: dados.categoriaId || null,
      data_cadastro: dados.dataCadastro || new Date().toISOString(),
    })
    .eq("transacao_id", transacaoId)
    .eq("usuario_id", user.id)
    .select("transacao_id")
    .maybeSingle();

  if (error) {
    console.error("Erro ao editar transação:", error);

    return {
      error: "Não foi possível editar a transação. Tente novamente.",
      success: false,
    };
  }

  if (!data) {
    return {
      error: "Transação não encontrada ou sem permissão para editá-la.",
      success: false,
    };
  }

  revalidatePath("/transacoes");

  return { error: null, success: true };
}
