import { GlobalToast } from "@/components/ui/global-toast";
import { listarTransacoes } from "./queries";
import { TransacaoList } from "@/components/transacoes/transacao-list";

type TransacoesPageProps = {
  searchParams: Promise<{ tipo?: string }>;
};

export default async function TransacoesPage({ searchParams }: TransacoesPageProps) {
  const { tipo } = await searchParams;
  const filtro = tipo === "receita" || tipo === "despesa" ? tipo : undefined;
  const { data: transacoes, error } = await listarTransacoes(filtro);
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

      <GlobalToast message={error} type="error" />

      {error ? null : transacoes.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Nenhuma transação encontrada.
        </div>
      ) : (
        <TransacaoList transacoes={transacoes} />
      )}
    </main>
  );
}
