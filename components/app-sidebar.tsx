"use client"

import {
  LayoutDashboard,
  Tags,
  ArrowLeftRight,
  ArrowUpCircle,
  ArrowDownCircle,
  LogOut,
} from "lucide-react"
import { logout } from "@/app/(auth)/logout/actions"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
   {
    title: "Transações",
    url: "/transacoes",
    icon: ArrowLeftRight,
  },
  {
    title: "Receitas",
    url: "/transacoes?tipo=receita",
    icon: ArrowUpCircle,
  },
  {
    title: "Despesas",
    url: "/transacoes?tipo=despesa",
    icon: ArrowDownCircle,
  },
  {
    title: "Categorias",
    url: "/categorias",
    icon: Tags,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<a href="/dashboard" />}>
              <div className="flex size-8 items-center justify-center rounded-lg bg-green-600 text-white">
                $
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Minhas Finanças
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Controle financeiro
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Finanças</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton render={<a href={item.url} />}>
                    <item.icon />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            {/* informações do usuário */}
          </SidebarMenuItem>

          <SidebarMenuItem>
            <form action={logout} className="w-full">
              <SidebarMenuButton type="submit">
                <LogOut />
                <span>Sair</span>
              </SidebarMenuButton>
            </form>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
