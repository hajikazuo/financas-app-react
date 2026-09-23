export interface CategoriaRow {
  categoria_id: string;
  nome: string;
}

export interface Categoria {
  categoriaId: string;
  nome: string;
}

export function mapearCategoria(row: CategoriaRow): Categoria {
  return {
    categoriaId: row.categoria_id,
    nome: row.nome,
  };
}
