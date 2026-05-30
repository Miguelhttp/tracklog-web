# Task: Sidebar

## Status
[ ] Pendente

## Background
Navegação lateral fixa da aplicação. Deve refletir a identidade visual
corporativa do Tracklog com fundo escuro e itens de navegação claros.

## Critérios de aceitação
- [ ] Fundo: var(--color-brand-sidebar) — #1E293B
- [ ] Logo "Tracklog" no topo com ícone de caminhão (lucide-react: Truck)
- [ ] Itens de navegação: Dashboard e Entregas
- [ ] Item ativo com fundo levemente claro e texto branco
- [ ] Item inativo com texto slate-400 e hover sutil
- [ ] usePathname() para detectar rota ativa
- [ ] Ícones lucide-react: LayoutDashboard para Dashboard, Package para Entregas

## Localização
components/layout/Sidebar.tsx

## Padrões obrigatórios
- 'use client'
- Tailwind CSS com tokens do @theme em globals.css
- Sem cores hardcoded — usar tokens ou classes Tailwind