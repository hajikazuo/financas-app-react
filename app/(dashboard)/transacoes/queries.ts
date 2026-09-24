import { createClient } from "@/lib/supabase/server";
import {
    mapearTransacao,
    type TipoTransacao,
    type Transacao,
    type TransacaoRow,
} from "@/types/transacao";

type ListarTransacoesResult = {
    data: Transacao[];
    error: string | null;
};

export async function listarTransacoes(filtro?: TipoTransacao): Promise<ListarTransacoesResult> {
    const supabase = await createClient();

    let query = supabase
        .from("transacoes")
        .select(`
            transacao_id,
            usuario_id,
            categoria_id,
            descricao,
            valor,
            data_cadastro,
            tipo_transacao,
            categoria:categorias!transacoes_categoria_id_fkey (
              nome
            )
        `)
        .order("data_cadastro", { ascending: false });

    if (filtro) {
        const tipoBanco = filtro === "receita" ? 1 : 2;
        query = query.eq("tipo_transacao", tipoBanco);
    }

    const { data, error } = await query;

    if (error) {
        console.error("Erro ao carregar transações:", error);

        return {
            data: [],
            error: "Não foi possível carregar as transações. Tente novamente mais tarde.",
        };
    }

    return {
        data: ((data ?? []) as TransacaoRow[]).map(mapearTransacao),
        error: null,
    };
}
