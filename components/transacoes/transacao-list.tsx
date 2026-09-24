import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import type { Transacao } from "@/types/transacao";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR");

export function TransacaoList({ transacoes }: { transacoes: Transacao[] }) {
  if (transacoes.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
        Nenhuma transação encontrada.
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Categoria</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Data</TableHead>
            <TableHead className="text-right">Valor</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transacoes.map((transacao) => {
            const isReceita = transacao.tipo === "receita";

            return (
              <TableRow key={transacao.transacaoId}>
                <TableCell>
                  {transacao.categoriaNome}
                </TableCell>
                <TableCell>
                  {transacao.descricao}
                </TableCell>
                <TableCell>
                  <span
                    className={
                      isReceita
                        ? "inline-flex items-center gap-1 text-primary"
                        : "inline-flex items-center gap-1 text-destructive"
                    }
                  >
                    {isReceita ? (
                      <ArrowUpCircle className="size-4" />
                    ) : (
                      <ArrowDownCircle className="size-4" />
                    )}
                    {isReceita ? "Receita" : "Despesa"}
                  </span>
                </TableCell>
                <TableCell>
                  {dateFormatter.format(new Date(transacao.dataCadastro))}
                </TableCell>
                <TableCell
                  className={`text-right font-medium ${
                    isReceita ? "text-primary" : "text-destructive"
                  }`}
                >
                  {currencyFormatter.format(transacao.valor)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
