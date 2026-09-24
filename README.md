# Finanças App

Aplicação web para organizar receitas, despesas e categorias em um só lugar. O projeto oferece um dashboard financeiro simples, com visão anual, comparativo de despesas, saldo mensal e acompanhamento das principais categorias de gastos.

## Funcionalidades

- Cadastro e autenticação de usuários
- Dashboard com resumo financeiro
- Comparativo de receitas e despesas com o ano anterior
- Visualização de despesas por mês e por categoria
- Cadastro, edição e exclusão de transações
- Filtro de transações por tipo e mês
- Cadastro, edição e exclusão de categorias
- Dados isolados por usuário com autenticação do Supabase
- Interface responsiva para desktop e dispositivos móveis

## Tecnologias

- [Next.js](https://nextjs.org/) 16 com App Router
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Supabase](https://supabase.com/) para autenticação e banco de dados
- [Tailwind CSS](https://tailwindcss.com/) 4
- [shadcn/ui](https://ui.shadcn.com/) e [Lucide](https://lucide.dev/) para a interface
- [Vercel](https://vercel.com/) para deploy

## Pré-requisitos

- Node.js 20 ou superior
- npm, pnpm, yarn ou Bun
- Um projeto no Supabase

## Configuração local

1. Clone o repositório:

   ```bash
   git clone https://github.com/hajikazuo/financas-app-react.git
   cd financas-app-react
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie um arquivo `.env.local` na raiz do projeto:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
   NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sua_chave_publica_do_supabase
   ```

   Essas informações podem ser encontradas em **Supabase → Project Settings → API**. Nunca compartilhe chaves secretas nem publique o arquivo `.env.local`.

4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

5. Abra [http://localhost:3000](http://localhost:3000) no navegador.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera a build de produção |
| `npm run start` | Inicia a aplicação em modo de produção |
| `npm run lint` | Executa a verificação de lint |

## Deploy

O projeto pode ser publicado gratuitamente na Vercel para uso pessoal:

1. Importe o repositório no [painel da Vercel](https://vercel.com/new).
2. Configure as variáveis `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` nas configurações do projeto.
3. Faça o deploy.

Depois da configuração, cada push na branch de produção gera um novo deploy automaticamente. A Vercel também cria deploys de preview para branches e pull requests.

## Estrutura principal

```text
app/
├── (auth)/                 # Login, cadastro e logout
├── (dashboard)/            # Dashboard, transações e categorias
├── globals.css             # Estilos globais
└── page.tsx                # Página inicial
components/                # Componentes reutilizáveis e componentes de UI
lib/supabase/              # Clientes Supabase para browser, servidor e proxy
types/                     # Tipos de domínio da aplicação
```

## Status

Projeto em desenvolvimento.

## Contribuição

Sugestões, issues e pull requests são bem-vindos. Antes de enviar uma alteração, execute:

```bash
npm run lint
npm run build
```
