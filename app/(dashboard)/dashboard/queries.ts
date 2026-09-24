import { createClient } from "@/lib/supabase/server";
import { mapearTransacao, type Transacao, type TransacaoRow } from "@/types/transacao";

type DashboardResult = { data: Transacao[]; error: string | null };

function intervaloAno(ano: number) {
  return { inicio: `${ano}-01-01`, fim: `${ano + 1}-01-01` };
}

export async function listarTransacoesDoDashboard(ano: number): Promise<DashboardResult> {
  const supabase = await createClient();
  const { inicio, fim } = intervaloAno(ano);
  const { data, error } = await supabase
    .from("transacoes")
    .select(`
      transacao_id,
      usuario_id,
      categoria_id,
      descricao,
      valor,
      data_cadastro,
      tipo_transacao,
      categoria:categorias!transacoes_categoria_id_fkey (nome)
    `)
    .gte("data_cadastro", inicio)
    .lt("data_cadastro", fim)
    .order("data_cadastro", { ascending: false });

  if (error) {
    console.error("Erro ao carregar dados do dashboard:", error);
    return { data: [], error: "Não foi possível carregar os dados do dashboard. Tente novamente mais tarde." };
  }

  return { data: ((data ?? []) as TransacaoRow[]).map(mapearTransacao), error: null };
}
