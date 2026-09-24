import Link from "next/link";
import { ArrowDownRight, ArrowUpRight, CalendarDays, ChevronRight, CircleDollarSign, PiggyBank, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardBreadcrumb } from "@/components/app-breadcrumb";
import { listarTransacoesDoDashboard } from "./queries";
import type { Transacao } from "@/types/transacao";
import { TransacaoMonthFilter } from "@/components/transacoes/transacao-month-filter";
import { mesValido, obterMesAtual } from "@/lib/mes";

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 2 });
const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

function somar(transacoes: Transacao[], tipo: Transacao["tipo"]) {
  return transacoes.filter((item) => item.tipo === tipo).reduce((total, item) => total + item.valor, 0);
}
function percentual(valor: number, base: number) { return base ? Math.round((valor / base) * 100) : 0; }
function comparar(atual: number, anterior: number) { return anterior ? Math.round(((atual - anterior) / anterior) * 100) : null; }
function formatarData(data: string) { return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short" }).format(new Date(data)); }
function agruparPorMes(transacoes: Transacao[], ano: number, tipo: Transacao["tipo"]) {
  return meses.map((_, indice) => transacoes.filter((item) => {
    const data = new Date(item.dataCadastro);
    return item.tipo === tipo && data.getFullYear() === ano && data.getMonth() === indice;
  }).reduce((total, item) => total + item.valor, 0));
}

function CardResumo({ titulo, valor, legenda, icone: Icon, classe, variacao, formato = "moeda" }: { titulo: string; valor: number; legenda: string; icone: typeof Wallet; classe: string; variacao?: number | null; formato?: "moeda" | "percentual" }) {
  const variacaoPositiva = (variacao ?? 0) >= 0;
  return <Card className="relative overflow-hidden border-0 bg-card shadow-sm">
    <div className={`absolute inset-x-0 top-0 h-1 ${classe}`} />
    <CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{titulo}</CardTitle><div className={`rounded-lg p-2 ${classe} text-white`}><Icon className="size-4" /></div></CardHeader>
    <CardContent><p className="text-2xl font-semibold tracking-tight">{formato === "percentual" ? `${valor}%` : moeda.format(valor)}</p><div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">{variacao !== undefined && variacao !== null ? <span className={variacaoPositiva ? "flex items-center text-emerald-600" : "flex items-center text-red-500"}>{variacaoPositiva ? <TrendingUp className="mr-1 size-3" /> : <TrendingDown className="mr-1 size-3" />}{Math.abs(variacao)}%</span> : null}<span>{legenda}</span></div></CardContent>
  </Card>;
}

function GraficoMensal({ atual, anterior }: { atual: number[]; anterior: number[] }) {
  const maiorValor = Math.max(...atual, ...anterior, 1);
  return <div className="mt-6"><div className="flex h-64 items-end gap-2 border-b border-l px-2 pt-4 sm:gap-3">{meses.map((mes, index) => { const alturaAtual = Math.max((atual[index] / maiorValor) * 100, atual[index] ? 3 : 0); const alturaAnterior = Math.max((anterior[index] / maiorValor) * 100, anterior[index] ? 3 : 0); return <div key={mes} className="group flex h-full flex-1 items-end justify-center gap-0.5"><div className="relative flex h-full flex-1 items-end justify-end"><div className="w-full rounded-t-sm bg-primary/85 transition-all group-hover:bg-primary" style={{ height: `${alturaAtual}%` }} title={`${mes}: ${moeda.format(atual[index])}`} /></div><div className="relative flex h-full flex-1 items-end"><div className="w-full rounded-t-sm bg-muted-foreground/20 transition-all group-hover:bg-muted-foreground/35" style={{ height: `${alturaAnterior}%` }} title={`${mes} anterior: ${moeda.format(anterior[index])}`} /></div></div>; })}</div><div className="mt-2 flex justify-between pl-2 text-[10px] text-muted-foreground sm:text-xs">{meses.map((mes) => <span key={mes} className="flex-1 text-center">{mes}</span>)}</div></div>;
}

export default async function DashboardPage({ searchParams }: { searchParams: Promise<{ mes?: string }> }) {
  const { mes: mesParam } = await searchParams;
  const mesSelecionado = mesValido(mesParam) && mesParam ? mesParam : obterMesAtual();
  const [anoSelecionado, numeroMesSelecionado] = mesSelecionado.split("-").map(Number);
  const mesAtual = numeroMesSelecionado - 1;
  const [{ data: transacoes, error }, { data: transacoesAnteriores }] = await Promise.all([listarTransacoesDoDashboard(anoSelecionado), listarTransacoesDoDashboard(anoSelecionado - 1)]);
  const receitas = somar(transacoes, "receita");
  const despesas = somar(transacoes, "despesa");
  const receitasAnteriores = somar(transacoesAnteriores, "receita");
  const despesasAnteriores = somar(transacoesAnteriores, "despesa");
  const receitasMes = transacoes.filter((item) => { const data = new Date(item.dataCadastro); return data.getFullYear() === anoSelecionado && data.getMonth() === mesAtual && item.tipo === "receita"; });
  const despesasMes = transacoes.filter((item) => { const data = new Date(item.dataCadastro); return data.getFullYear() === anoSelecionado && data.getMonth() === mesAtual && item.tipo === "despesa"; });
  const totalReceitasMes = somar(receitasMes, "receita");
  const totalDespesasMes = somar(despesasMes, "despesa");
  const saldo = totalReceitasMes - totalDespesasMes;
  const economia = percentual(Math.max(saldo, 0), totalReceitasMes);
  const despesasPorCategoria = Object.entries(transacoes.filter((item) => item.tipo === "despesa").reduce<Record<string, number>>((acumulado, item) => { acumulado[item.categoriaNome] = (acumulado[item.categoriaNome] ?? 0) + item.valor; return acumulado; }, {})).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maiorCategoria = despesasPorCategoria[0]?.[1] ?? 1;
  const maioresDespesas = transacoes.filter((item) => item.tipo === "despesa").sort((a, b) => b.valor - a.valor).slice(0, 5);
  const nomesMes = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(new Date(anoSelecionado, mesAtual, 1));

  return <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6">
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <DashboardBreadcrumb title="Visão geral" />
        <p className="mt-5 text-sm font-medium text-primary">
          Olá, vamos cuidar do seu dinheiro?
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">
          Resumo financeiro
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Acompanhe sua evolução em {anoSelecionado}.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <CalendarDays className="size-4 text-primary" />
        <TransacaoMonthFilter mes={mesSelecionado} />
      </div>
    </div>
    {error ? (
      <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
        {error}
      </div>
    ) : null}
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <CardResumo
        titulo="Receitas no ano"
        valor={receitas}
        legenda="vs. ano anterior"
        icone={ArrowUpRight}
        classe="bg-emerald-500"
        variacao={comparar(receitas, receitasAnteriores)}
      />
      <CardResumo
        titulo="Despesas no ano"
        valor={despesas}
        legenda="vs. ano anterior"
        icone={ArrowDownRight}
        classe="bg-rose-500"
        variacao={comparar(despesas, despesasAnteriores)}
      />
      <CardResumo
        titulo="Saldo do mês"
        valor={saldo}
        legenda={`resultado de ${nomesMes}`}
        icone={Wallet}
        classe="bg-sky-500"
      />
      <CardResumo
        titulo="Taxa de economia"
        valor={economia}
        legenda="da receita do mês"
        icone={PiggyBank}
        classe="bg-violet-500"
        formato="percentual"
      />
    </div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.55fr)_minmax(320px,0.9fr)]">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4 border-b pb-4">
          <div>
            <CardTitle>Despesas mensais</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Comparativo entre {anoSelecionado} e {anoSelecionado - 1}
            </p>
          </div>
          <div className="flex shrink-0 gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <i className="size-2 rounded-full bg-primary" />
              {anoSelecionado}
            </span>
            <span className="flex items-center gap-1.5">
              <i className="size-2 rounded-full bg-muted-foreground/25" />
              {anoSelecionado - 1}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <GraficoMensal
            atual={agruparPorMes(transacoes, anoSelecionado, "despesa")}
            anterior={agruparPorMes(
              transacoesAnteriores,
              anoSelecionado - 1,
              "despesa"
            )}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Onde você mais gasta</CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Distribuição das despesas de {anoSelecionado}
          </p>
        </CardHeader>
        <CardContent className="space-y-5 pt-3">
          {despesasPorCategoria.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted-foreground">
              Ainda não há despesas registradas.
            </p>
          ) : (
            despesasPorCategoria.map(([categoria, valor], index) => (
              <div key={categoria}>
                <div className="mb-2 flex justify-between gap-3 text-sm">
                  <span className="truncate font-medium">{categoria}</span>
                  <span className="text-muted-foreground">
                    {moeda.format(valor)}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-muted">
                  <div
                    className={`h-full rounded-full ${[
                        "bg-primary",
                        "bg-sky-500",
                        "bg-violet-500",
                        "bg-amber-500",
                        "bg-rose-400",
                      ][index]
                      }`}
                    style={{ width: `${(valor / maiorCategoria) * 100}%` }}
                  />
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div>
            <CardTitle>Maiores despesas</CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              As movimentações que mais impactaram seu orçamento
            </p>
          </div>
          <Link
            href={`/transacoes?tipo=despesa&mes=${mesSelecionado}`}
            className="flex items-center text-xs font-medium text-primary hover:underline"
          >
            Ver todas <ChevronRight className="ml-1 size-3" />
          </Link>
        </CardHeader>
        <CardContent className="p-0">
          {maioresDespesas.length === 0 ? (
            <p className="p-6 text-sm text-muted-foreground">
              Nenhuma despesa registrada em {anoSelecionado}.
            </p>
          ) : (
            <div className="divide-y">
              {maioresDespesas.map((item) => (
                <div
                  key={item.transacaoId}
                  className="flex items-center justify-between gap-4 px-6 py-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                      <CircleDollarSign className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {item.descricao}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.categoriaNome} · {formatarData(item.dataCadastro)}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-semibold text-rose-600">
                    - {moeda.format(item.valor)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="border-0 bg-primary text-primary-foreground">
        <CardHeader>
          <CardTitle className="text-primary-foreground">
            Fechamento do mês
          </CardTitle>
          <p className="mt-1 text-sm text-primary-foreground/70">
            Seu desempenho em {nomesMes}
          </p>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-primary-foreground/70">
                Saldo disponível
              </p>
              <p className="mt-1 text-3xl font-semibold">{moeda.format(saldo)}</p>
            </div>
            <Wallet className="size-8 text-primary-foreground/60" />
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-primary-foreground/20">
            <div
              className="h-full rounded-full bg-primary-foreground"
              style={{ width: `${Math.min(economia, 100)}%` }}
            />
          </div>
          <div className="grid grid-cols-2 gap-3 border-t border-primary-foreground/15 pt-4 text-sm">
            <div>
              <p className="text-primary-foreground/60">Entradas</p>
              <p className="mt-1 font-medium">{moeda.format(totalReceitasMes)}</p>
            </div>
            <div>
              <p className="text-primary-foreground/60">Saídas</p>
              <p className="mt-1 font-medium">{moeda.format(totalDespesasMes)}</p>
            </div>
          </div>
          <Link
            href="/transacoes"
            className="flex items-center justify-center rounded-lg bg-primary-foreground/10 px-3 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/20"
          >
            Ver movimentações <ChevronRight className="ml-1 size-4" />
          </Link>
        </CardContent>
      </Card>
    </div>
  </main>;
}
