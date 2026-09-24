import { GlobalToast } from "@/components/ui/global-toast";
import { DashboardBreadcrumb } from "@/components/app-breadcrumb";
import { TransacaoForm } from "@/components/transacoes/transacao-form";
import { listarCategorias } from "@/app/(dashboard)/categorias/queries";
import { listarTransacoes } from "./queries";
import { TransacaoList } from "@/components/transacoes/transacao-list";
import { TransacaoMonthFilter } from "@/components/transacoes/transacao-month-filter";
import { mesValido, obterMesAtual } from "@/lib/mes";

type TransacoesPageProps = {
  searchParams: Promise<{ tipo?: string; mes?: string }>;
};

export default async function TransacoesPage({ searchParams }: TransacoesPageProps) {
  const { tipo, mes: mesParam } = await searchParams;
  const filtro = tipo === "receita" || tipo === "despesa" ? tipo : undefined;
  const mes = mesValido(mesParam) && mesParam ? mesParam : obterMesAtual();
  const [transacoesResult, categoriasResult] = await Promise.all([
    listarTransacoes(filtro, mes),
    listarCategorias(),
  ]);
  const { data: transacoes, error } = transacoesResult;
  const { data: categorias, error: categoriasError } = categoriasResult;
  const titulo = filtro
    ? filtro === "receita"
      ? "Receitas"
      : "Despesas"
    : "Todas as transações";

  return (
    <main className="flex flex-1 flex-col gap-6 p-6">
      <div className="mb-4">
        <DashboardBreadcrumb title={titulo} />
      </div>

      <div>
        <p className="text-sm text-muted-foreground">Movimentações</p>
        <h1 className="text-2xl font-semibold tracking-tight">{titulo}</h1>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <GlobalToast message={error ?? categoriasError} type="error" />
        <TransacaoMonthFilter mes={mes} />
        <TransacaoForm categorias={categorias} tipoInicial={filtro} />
      </div>

      {error ? null : transacoes.length === 0 ? (
        <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
          Nenhuma transação encontrada.
        </div>
      ) : (
        <TransacaoList transacoes={transacoes} categorias={categorias} />
      )}
    </main>
  );
}
