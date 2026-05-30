# Task: Dashboard Page

## Status
[ ] Pendente

## Background
Visão geral das entregas com cards de métricas por status
e tabela das últimas entregas.

## Critérios de aceitação
- [ ] Grid 2x2 (mobile) e 4x1 (desktop) com cards de métrica por status
- [ ] Cada card: badge de status + número grande + label "entregas"
- [ ] Card com fundo bg-slate-50, border slate-200, rounded-card
- [ ] Seção "Últimas entregas": lista com código, destinatário, rota e badge
- [ ] Seta "Ver todas" linkando para /deliveries
- [ ] Server Component — busca dados via apiServer

## Localização
app/(dashboard)/dashboard/page.tsx

## Padrões obrigatórios
- Server Component (sem 'use client')
- apiServer de @/services/api.server
- Badge de @/components/ui/Badge
- Tipos de @/types/delivery