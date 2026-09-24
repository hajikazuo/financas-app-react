"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { deslocarMes, formatarMes } from "@/lib/mes";

export function TransacaoMonthFilter({ mes }: { mes: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function selecionarMes(novoMes: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("mes", novoMes);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <ButtonGroup aria-label="Filtro por mês">
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="Mês anterior"
        title="Mês anterior"
        onClick={() => selecionarMes(deslocarMes(mes, -1))}
      >
        <ChevronLeft />
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        className="min-w-32 capitalize"
        aria-label={`Mês selecionado: ${formatarMes(mes)}`}
        onClick={() => selecionarMes(mes)}
      >
        {formatarMes(mes)}
      </Button>
      <Button
        type="button"
        variant="outline"
        size="sm"
        aria-label="Próximo mês"
        title="Próximo mês"
        onClick={() => selecionarMes(deslocarMes(mes, 1))}
      >
        <ChevronRight />
      </Button>
    </ButtonGroup>
  );
}
