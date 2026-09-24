export interface CategoriaRow {
  categoria_id: string;
  usuario_id: string | null;
  nome: string | null;
}

export interface Categoria {
  categoriaId: string;
  usuarioId: string | null;
  nome: string;
}

export function mapearCategoria(row: CategoriaRow): Categoria {
  return {
    categoriaId: row.categoria_id,
    usuarioId: row.usuario_id,
    nome: row.nome ?? "Sem nome",
  };
}
