# Task: Header

## Status
[ ] Pendente

## Background
Barra superior do dashboard com boas-vindas ao usuário e botão de logout.

## Critérios de aceitação
- [ ] Altura fixa h-14
- [ ] Fundo branco com borda inferior slate-200
- [ ] Lado esquerdo: breadcrumb ou título da página atual via usePathname()
- [ ] Lado direito: avatar com iniciais do usuário + nome + botão logout
- [ ] Avatar: círculo com iniciais, fundo brand-accent-light, texto brand-accent
- [ ] Botão logout: ícone LogOut do lucide-react, texto slate-500, hover text-red-500

## Localização
components/layout/Header.tsx

## Padrões obrigatórios
- 'use client'
- useAuth() para acessar user e logout
- Tailwind CSS com tokens definidos