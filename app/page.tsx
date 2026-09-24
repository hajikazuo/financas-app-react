import Link from "next/link";
import { ArrowRight, BarChart3, Check, CircleDollarSign, ShieldCheck, Sparkles, Wallet } from "lucide-react";

const recursos = [
  { icone: BarChart3, titulo: "Entenda seus hábitos", descricao: "Visualize seus gastos por mês, ano e categoria em uma dashboard clara." },
  { icone: Wallet, titulo: "Tenha tudo em um só lugar", descricao: "Registre receitas e despesas sem planilhas complicadas ou cálculos manuais." },
  { icone: ShieldCheck, titulo: "Planeje com tranquilidade", descricao: "Acompanhe seu saldo e tome decisões melhores para o seu futuro financeiro." },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faf8] text-slate-950">
      <section className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_75%_5%,rgba(34,197,94,0.16),transparent_35%),linear-gradient(180deg,#effaf2_0%,#f7faf8_78%)]" />
        <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
            <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white shadow-lg shadow-emerald-600/20">$</span>
            <span>Minhas Finanças</span>
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link href="/login" className="rounded-lg px-3 py-2 font-medium text-slate-600 transition-colors hover:bg-white hover:text-slate-950">Entrar</Link>
            <Link href="/cadastro" className="rounded-lg bg-slate-950 px-4 py-2 font-medium text-white transition-colors hover:bg-slate-800">Criar conta</Link>
          </div>
        </nav>

        <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:pb-28 lg:pt-20">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-1.5 text-xs font-medium text-emerald-700 shadow-sm"><Sparkles className="size-3.5" /> Seu dinheiro, mais organizado</div>
            <h1 className="max-w-xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl">Clareza para cuidar melhor das suas <span className="text-emerald-600">finanças.</span></h1>
            <p className="mt-6 max-w-lg text-lg leading-8 text-slate-600">O Minhas Finanças ajuda você a acompanhar receitas, despesas e evolução financeira sem complicação.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/cadastro" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 font-medium text-white shadow-lg shadow-emerald-600/20 transition-all hover:-translate-y-0.5 hover:bg-emerald-700">Começar agora <ArrowRight className="size-4" /></Link><Link href="/login" className="inline-flex h-12 items-center justify-center rounded-xl border border-slate-200 bg-white px-6 font-medium text-slate-700 transition-colors hover:bg-slate-50">Já tenho uma conta</Link></div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500"><span className="flex items-center gap-1.5"><Check className="size-4 text-emerald-600" /> Fácil de usar</span><span className="flex items-center gap-1.5"><Check className="size-4 text-emerald-600" /> Visão completa</span><span className="flex items-center gap-1.5"><Check className="size-4 text-emerald-600" /> Mais controle</span></div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:justify-self-end">
            <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-emerald-200/40 blur-3xl" />
            <div className="rounded-3xl border border-white bg-white p-4 shadow-2xl shadow-emerald-900/10 sm:p-6">
              <div className="flex items-center justify-between"><div><p className="text-xs font-medium text-slate-500">Visão geral</p><p className="mt-1 text-lg font-semibold">Resumo financeiro</p></div><div className="rounded-xl bg-emerald-50 p-2.5 text-emerald-600"><CircleDollarSign className="size-5" /></div></div>
              <div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-emerald-50 p-4"><p className="text-xs text-emerald-700">Receitas</p><p className="mt-2 text-xl font-semibold text-emerald-950">R$ 5.430</p><p className="mt-1 text-[11px] text-emerald-700">+12% este mês</p></div><div className="rounded-2xl bg-rose-50 p-4"><p className="text-xs text-rose-700">Despesas</p><p className="mt-2 text-xl font-semibold text-rose-950">R$ 3.280</p><p className="mt-1 text-[11px] text-rose-700">-8% este mês</p></div></div>
              <div className="mt-4 rounded-2xl border border-slate-100 p-4"><div className="flex items-center justify-between"><div><p className="text-xs text-slate-500">Despesas mensais</p><p className="mt-1 text-sm font-medium">Evolução do ano</p></div><span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] text-slate-500">2025</span></div><div className="mt-5 flex h-28 items-end gap-2">{[32, 46, 39, 61, 49, 74, 58, 82, 68, 88, 70, 94].map((altura, index) => <div key={index} className="flex-1 rounded-t-md bg-emerald-500/80" style={{ height: `${altura}%` }} />)}</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200/70 bg-white/70 px-6 py-16 lg:px-8 lg:py-20"><div className="mx-auto w-full max-w-7xl"><div className="max-w-xl"><p className="text-sm font-semibold text-emerald-600">Tudo mais simples</p><h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Uma visão mais leve das suas decisões.</h2><p className="mt-4 text-slate-600">Organize o presente para construir um futuro financeiro mais tranquilo.</p></div><div className="mt-10 grid gap-5 md:grid-cols-3">{recursos.map(({ icone: Icon, titulo, descricao }) => <div key={titulo} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><div className="flex size-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600"><Icon className="size-5" /></div><h3 className="mt-5 font-semibold">{titulo}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{descricao}</p></div>)}</div></div></section>

      <section className="px-6 py-16 lg:px-8 lg:py-20"><div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-6 rounded-3xl bg-slate-950 px-7 py-10 text-white sm:px-10 lg:flex-row lg:items-center"><div><p className="text-sm font-medium text-emerald-400">Pronto para começar?</p><h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Seu próximo passo financeiro começa aqui.</h2></div><Link href="/cadastro" className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-emerald-400">Criar minha conta <ArrowRight className="size-4" /></Link></div></section>
      <footer className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 pb-8 text-xs text-slate-500 lg:px-8"><span>© {new Date().getFullYear()} Minhas Finanças</span><span>Controle financeiro com simplicidade</span></footer>
    </main>
  );
}
