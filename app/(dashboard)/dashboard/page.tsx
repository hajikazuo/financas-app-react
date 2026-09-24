import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  ArrowDownRight,
  ArrowUpRight,
  PiggyBank,
  Wallet,
} from "lucide-react"

export default async function Home() {
  return (
    <main className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Finanças</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Receitas */}
        <Card className="border-0 bg-emerald-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Receitas
            </CardTitle>

            <ArrowUpRight className="h-5 w-5" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              R$ 5.430,00
            </div>

            <p className="mt-1 text-xs text-white/80">
              +12% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        {/* Despesas */}
        <Card className="border-0 bg-red-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Despesas
            </CardTitle>

            <ArrowDownRight className="h-5 w-5" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              R$ 3.280,00
            </div>

            <p className="mt-1 text-xs text-white/80">
              -8% em relação ao mês passado
            </p>
          </CardContent>
        </Card>

        {/* Saldo */}
        <Card className="border-0 bg-blue-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Saldo
            </CardTitle>

            <Wallet className="h-5 w-5" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              R$ 2.150,00
            </div>

            <p className="mt-1 text-xs text-white/80">
              Disponível neste mês
            </p>
          </CardContent>
        </Card>

        {/* Economia */}
        <Card className="border-0 bg-violet-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Economia
            </CardTitle>

            <PiggyBank className="h-5 w-5" />
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              R$ 1.250,00
            </div>

            <p className="mt-1 text-xs text-white/80">
              23% da receita mensal
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}