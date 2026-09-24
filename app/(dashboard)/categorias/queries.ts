import { createClient } from "@/lib/supabase/server";
import { mapearCategoria, type Categoria, type CategoriaRow } from "@/types/categoria";

type ListarCategoriasResult = {
  data: Categoria[];
  error: string | null;
};

export async function listarCategorias(): Promise<ListarCategoriasResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("categorias")
    .select("categoria_id, nome")
    .order("nome", { ascending: true });

  if (error) {
    console.error("Erro ao carregar categorias:", error);

    return {
      data: [],
      error: "Não foi possível carregar as categorias. Tente novamente mais tarde.",
    };
  }

  return {
    data: ((data ?? []) as CategoriaRow[]).map(mapearCategoria),
    error: null,
  };
}
