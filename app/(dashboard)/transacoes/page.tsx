import { createClient } from "@/lib/supabase/server";
import { TransacaoList } from "@/components/transacoes/transacao-list";
import {
  mapearTransacao,
  type TransacaoRow,
} from "@/types/transacao";

type TransacoesPageProps = {
  searchParams: Promise<{ tipo?: string }>;
};

export default async function TransacoesPage({
  searchParams,
}: TransacoesPageProps) {
  const { tipo } = await searchParams;
  const filtro = tipo === "receita" || tipo === "despesa" ? tipo : undefined;
  const supabase = await createClient();

  let query = supabase
    .from("transacoes")
    .select("*")
    .order("data_cadastro", { ascending: false });

  if (filtro) {
    const tipoBanco = filtro === "receita" ? 1 : 2;
    query = query.eq("tipo_transacao", tipoBanco);
  }

  const { data, error } = await query;
  const transacoes = ((data ?? []) as TransacaoRow[]).map(mapearTransacao);
  const titulo = filtro
    ? filtro === "receita"
      ? "Receitas"
      : "Despesas"
    : "Todas as transações";

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <p className="text-sm text-muted-foreground">Movimentações</p>
        <h1 className="text-2xl font-semibold tracking-tight">{titulo}</h1>
      </div>

      {error ? (
        <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          Não foi possível carregar as transações: {error.message}
        </div>
      ) : (
        <TransacaoList transacoes={transacoes} />
      )}
    </main>
  );
}
