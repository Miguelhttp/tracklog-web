# Task: Badge de Status

## Status
[ ] Pendente

## Background
Componente reutilizável de status usado em toda a aplicação.
Deve usar os tokens de cor definidos no @theme do globals.css.

## Critérios de aceitação
- [ ] Variantes: pending, in_transit, delivered, failed
- [ ] Cores vindas dos tokens --color-status-* do globals.css
- [ ] Formato pill (border-radius: 999px)
- [ ] Tamanho sm (padrão) e lg (opcional via prop)
- [ ] Ícone opcional à esquerda do label via lucide-react:
      pending → Clock, in_transit → Truck, delivered → CheckCircle, failed → XCircle

## Localização
components/ui/Badge.tsx

## Padrões obrigatórios
- Sem 'use client' — componente puro sem estado
- TypeScript: prop status: DeliveryStatus
- Tipos de @/types/delivery