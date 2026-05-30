# Task: Página de Detalhe de Entrega

## Status
[ ] Pendente | [ ] Em progresso | [x] Concluída

## Background
Página que exibe os detalhes completos de uma entrega específica,
incluindo informações gerais e histórico de eventos (timeline).

## Rota
app/(dashboard)/deliveries/[id]/page.tsx

## Critérios de aceitação
- [ ] Exibe código, destinatário, origem, destino e status
- [ ] Renderiza timeline com todos os eventos do histórico
- [ ] Botão de voltar para /deliveries
- [ ] Trata entrega não encontrada com notFound()
- [ ] Responsivo em mobile

## Restrições técnicas
- Server Component — sem 'use client'
- Usar apiServer de @/services/api.server
- Tipos de @/types/delivery
- Padrão visual: bg-white rounded-xl border border-gray-100

## Componentes necessários
- DeliveryTimeline (novo) em components/delivery/DeliveryTimeline.tsx

## Notas
- params é Promise<{ id: string }> no Next.js 16