-# tracklog-web

## Visão geral
Frontend do sistema de rastreamento de entregas.
Construído com Next.js 16, TypeScript, Tailwind CSS e App Router.

## Stack
- Next.js 16 (App Router)
- TypeScript strict
- Tailwind CSS
- Context API (autenticação)
- js-cookie (persistência do token)

## Estrutura de rotas
app/
├── (auth)/login         → página de login
├── (dashboard)/dashboard → visão geral com métricas
└── (dashboard)/deliveries → listagem e detalhe de entregas

## Padrões obrigatórios
- Server Components usam apiServer de @/services/api.server
- Client Components usam api de @/services/api
- Token JWT salvo em cookie com nome 'tracklog-token' (sem dois pontos)
- Tipos importados de @/types/delivery e @/types/auth
- Utilitários de @/lib/utils (formatDate, statusConfig)
- Tailwind: padrão visual bg-white rounded-xl border border-gray-100
- Sem any, sem as string para silenciar erros

## Autenticação
- AuthContext em @/contexts/auth-context
- useAuth() disponibiliza user, token, isAuthenticated, login, logout
- Proteção de rotas no app/(dashboard)/layout.tsx

## Backend
- Rodando em http://localhost:3333
- Variável: NEXT_PUBLIC_API_URL no .env.local