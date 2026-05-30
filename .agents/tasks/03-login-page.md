# Task: Página de Login

## Status
[ ] Pendente

## Background
Única página pública da aplicação. Primeiro contato visual do usuário
com o Tracklog — deve transmitir confiança e profissionalismo.

## Critérios de aceitação
- [ ] Fundo: bg-slate-50
- [ ] Card centralizado, max-w-md, bg-white, border slate-200, rounded-card, shadow-sm
- [ ] Logo com ícone Truck (lucide-react) + nome "Tracklog" no topo do card
- [ ] Subtítulo: "Faça login para acessar o painel"
- [ ] Campos: Email e Senha com label, placeholder e focus ring brand-accent
- [ ] Botão "Entrar": bg-brand-accent, hover escurece, disabled opacity-50
- [ ] Estado de loading: spinner inline + texto "Entrando..."
- [ ] Mensagem de erro: bg-red-50, text-red-600, ícone AlertCircle (lucide-react)
- [ ] Responsivo — funciona bem em mobile

## Localização
app/(auth)/login/page.tsx

## Padrões obrigatórios
- 'use client'
- useAuth() para login
- useState para email, password, error, isLoading
- Sem form tag — usar onClick no botão e onKeyDown Enter nos inputs