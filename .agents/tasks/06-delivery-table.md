# Task: Tabela de Entregas

## Status
[ ] Pendente

## Background
Tabela responsiva que lista todas as entregas com filtros por status.

## Critérios de aceitação
- [ ] Colunas: Código, Destinatário, Origem, Destino, Status, Atualizado, Ação
- [ ] Linha com hover bg-slate-50
- [ ] Badge de status em cada linha
- [ ] Link "Ver →" em brand-accent levando para /deliveries/[id]
- [ ] Estado vazio: ícone PackageX + mensagem "Nenhuma entrega encontrada"
- [ ] Filtros por status como pills acima da tabela (componente DeliveryFilters existente — apenas atualizar visual)
- [ ] Responsivo: em mobile exibir cards empilhados ao invés de tabela

## Localização
components/delivery/DeliveryTable.tsx

## Padrões obrigatórios
- 'use client'
- Props: deliveries: Delivery[]
- formatDate de @/lib/utils
- Badge de @/components/ui/Badge