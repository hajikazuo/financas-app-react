import { SearchIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Input } from "@/components/ui/input"

export function BuscaInput() {
  return (
    <form action="/transacoes" method="get">
      <ButtonGroup>
        <Input name="q" placeholder="Buscar..." aria-label="Buscar" />
        <Button type="submit" variant="outline" aria-label="Buscar">
          <SearchIcon />
        </Button>
      </ButtonGroup>
    </form>
  )
}
