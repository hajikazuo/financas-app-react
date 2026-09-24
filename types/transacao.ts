export type TipoTransacao = "receita" | "despesa";
export type TipoTransacaoBanco = 1 | 2;

export interface TransacaoRow {
  transacao_id: string;
  usuario_id: string;
  categoria_id: string | null;
  descricao: string | null;
  valor: number;
  data_cadastro: string;
  tipo_transacao: TipoTransacaoBanco;
  categoria: {
    nome: string;
  } | {
    nome: string;
  }[] | null;
}

export interface Transacao {
  transacaoId: string;
  usuarioId: string;
  categoriaId: string;
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  dataCadastro: string;
  categoriaNome: string;
}

export function mapearTransacao(row: TransacaoRow): Transacao {
  if (row.tipo_transacao !== 1 && row.tipo_transacao !== 2) {
    throw new Error(`Tipo de transação inválido: ${row.tipo_transacao}`);
  }

  const categoria = Array.isArray(row.categoria)
    ? row.categoria[0]
    : row.categoria;

  return {
    transacaoId: row.transacao_id,
    usuarioId: row.usuario_id,
    categoriaId: row.categoria_id ?? "",
    descricao: row.descricao ?? "Sem descrição",
    valor: Number(row.valor),
    tipo: row.tipo_transacao === 1 ? "receita" : "despesa",
    dataCadastro: row.data_cadastro,
    categoriaNome: categoria?.nome ?? "Sem categoria",
  };
}
