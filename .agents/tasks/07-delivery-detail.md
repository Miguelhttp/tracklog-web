# Task: Página de Detalhe da Entrega

## Status
[ ] Pendente

## Background
Página com informações completas de uma entrega e timeline
do histórico de eventos.

## Critérios de aceitação
- [ ] Botão "← Voltar" linkando para /deliveries
- [ ] Header: código da entrega em destaque + Badge de status
- [ ] Card de informações: destinatário, origem, destino, criado em, atualizado em
- [ ] Timeline vertical com todos os eventos do histórico
- [ ] Cada evento: linha vertical conectora + círculo + data + local + descrição
- [ ] Último evento com círculo em brand-accent
- [ ] notFound() se entrega não existir

## Localização
app/(dashboard)/deliveries/[id]/page.tsx
components/delivery/DeliveryTimeline.tsx (novo)

## Padrões obrigatórios
- Server Component (sem 'use client')
- params: Promise<{ id: string }> — Next.js 16
- apiServer de @/services/api.server
- formatDate de @/lib/utils