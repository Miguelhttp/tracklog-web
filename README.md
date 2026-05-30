# Tracklog Web

Sistema de rastreamento de entregas para empresas de logística — interface web construída com Next.js 16 e App Router.

![Next.js](https://img.shields.io/badge/Next.js-16.2.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=flat-square&logo=tailwindcss)
![CI](https://img.shields.io/github/actions/workflow/status/seu-usuario/tracklog-web/ci.yml?style=flat-square&label=CI)

---

## Visão geral

O Tracklog Web é o frontend do sistema Tracklog, permitindo que operadores e gestores de logística acompanhem entregas em tempo real, filtrem por status e visualizem o histórico completo de cada entrega.

### Funcionalidades

- Autenticação com JWT e persistência via cookie
- Dashboard com métricas de entregas por status
- Listagem de entregas com filtro por status
- Página de detalhe com timeline de eventos
- Dark/Light mode com preferência do sistema
- Layout responsivo Mobile First

---

## Stack

| Tecnologia | Versão | Uso |
|---|---|---|
| Next.js | 16.2.6 | Framework — App Router |
| TypeScript | 5.x | Tipagem estática |
| Tailwind CSS | v4 | Estilização — CSS-first |
| next-themes | latest | Dark/Light mode |
| js-cookie | latest | Persistência do token JWT |
| lucide-react | latest | Ícones |
| Inter | Google Fonts | Tipografia |

---

## Pré-requisitos

- Node.js 20+
- npm 10+
- [`tracklog-api`](https://github.com/seu-usuario/tracklog-api) rodando localmente

---

## Instalação e execução

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/tracklog-web.git
cd tracklog-web
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env.local
```

Edite o `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3333
```

### 4. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## Credenciais de acesso (desenvolvimento)

```
Email:  ceo@tracklog.com
Senha:  admin123
```

---

## Scripts disponíveis

```bash
npm run dev          # Servidor de desenvolvimento com Turbopack
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Lint com ESLint
npm run typecheck    # Verificação de tipos TypeScript
```

---

## Estrutura do projeto

```
tracklog-web/
├── app/
│   ├── (auth)/
│   │   └── login/            # Página de login
│   ├── (dashboard)/
│   │   ├── layout.tsx         # Layout protegido com Sidebar e Header
│   │   ├── dashboard/         # Dashboard com métricas
│   │   └── deliveries/        # Listagem e detalhe de entregas
│   ├── layout.tsx             # Root layout — providers globais
│   └── globals.css            # Tokens de design (@theme Tailwind v4)
├── components/
│   ├── ui/                    # Badge, ThemeToggle
│   ├── delivery/              # DeliveryTable, DeliveryFilters, DeliveryTimeline
│   └── layout/                # Sidebar, Header
├── contexts/
│   └── auth-context.tsx       # AuthContext — token JWT e estado do usuário
├── services/
│   ├── api.ts                 # Requisições client side
│   └── api.server.ts          # Requisições server side (Server Components)
├── types/
│   ├── auth.ts                # User, AuthState
│   └── delivery.ts            # Delivery, DeliveryStatus, DeliveryEvent
├── lib/
│   └── utils.ts               # formatDate, statusConfig
└── .agents/
    ├── tasks/                 # Tasks executadas pelo agente
    └── skills/                # Skills reutilizáveis do projeto
```

---

## Arquitetura

### Server vs Client Components

| Componente | Tipo | Motivo |
|---|---|---|
| `dashboard/page.tsx` | Server | Busca dados no servidor com token via cookie |
| `deliveries/page.tsx` | Server | Busca dados com suporte a searchParams |
| `deliveries/[id]/page.tsx` | Server | Busca detalhe da entrega por ID |
| `Sidebar` | Client | Usa `usePathname` para detectar rota ativa |
| `Header` | Client | Usa `useAuth` para exibir usuário e logout |
| `DeliveryFilters` | Client | Usa `useRouter` e `useSearchParams` |
| `DeliveryTable` | Client | Interatividade com links e hover |

### Autenticação

```
Login → POST /auth/login → token JWT
     → salvo em cookie 'tracklog-token'
     → AuthContext disponibiliza globalmente

Server Components → leem cookie via next/headers → api.server.ts
Client Components → leem cookie via js-cookie   → api.ts
```

---

## Variáveis de ambiente

| Variável | Descrição | Exemplo |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL base da API | `http://localhost:3333` |

---

## Pipeline CI

A pipeline executa automaticamente em todo push e pull request para `main` e `develop`:

```
Checkout → Instalar dependências → Verificar tipos → Lint → Build
```

Configuração em `.github/workflows/ci.yml`.

---

## Repositórios relacionados

| Repositório | Descrição |
|---|---|
| [tracklog-api](https://github.com/seu-usuario/tracklog-api) | Backend Node.js + Express + JWT |

---

## Autor

Desenvolvido por **[Seu Nome](https://github.com/seu-usuario)**

---

## Licença

MIT