# Git Workflow — Tracklog

Guia de boas práticas de versionamento adotadas nos repositórios
`tracklog-api` e `tracklog-web`.

---

## Estrutura de branches

```
main
└── develop
    ├── feature/nome-da-feature
    ├── fix/nome-do-bug
    ├── refactor/nome-da-refatoração
    └── chore/nome-da-tarefa
```

| Branch | Propósito |
|---|---|
| `main` | Código em produção — nunca recebe commit direto |
| `develop` | Integração contínua — base para todas as features |
| `feature/*` | Nova funcionalidade |
| `fix/*` | Correção de bug |
| `refactor/*` | Refatoração sem mudança de comportamento |
| `chore/*` | Configuração, dependências, CI, docs |

---

## Fluxo de trabalho padrão

### 1. Sempre parta da develop atualizada

```bash
git checkout develop
git pull origin develop
```

### 2. Crie sua branch a partir da develop

```bash
git checkout -b feature/delivery-filters
```

### 3. Desenvolva com commits pequenos e descritivos

```bash
git add .
git commit -m "feat: adiciona filtro por status na listagem de entregas"
```

### 4. Mantenha sua branch atualizada com a develop

```bash
git fetch origin
git rebase origin/develop
```

### 5. Abra um Pull Request para a develop

Nunca faça merge direto via terminal para `develop` ou `main`.
Sempre abra um PR no GitHub para revisão.

### 6. Após aprovação e merge, delete a branch

```bash
git branch -d feature/delivery-filters
git push origin --delete feature/delivery-filters
```

---

## Convenção de commits

Seguimos o padrão **Conventional Commits**:

```
<tipo>(<escopo opcional>): <descrição curta>

<corpo opcional>

<rodapé opcional>
```

### Tipos

| Tipo | Quando usar |
|---|---|
| `feat` | Nova funcionalidade |
| `fix` | Correção de bug |
| `style` | Mudança visual sem impacto em lógica |
| `refactor` | Refatoração sem mudança de comportamento |
| `test` | Adição ou correção de testes |
| `chore` | Configuração, build, dependências |
| `docs` | Documentação |
| `ci` | Alterações na pipeline |
| `perf` | Melhoria de performance |

### Exemplos

```bash
# Funcionalidade nova
git commit -m "feat: implementa autenticação JWT no endpoint de login"

# Correção de bug
git commit -m "fix: corrige token não enviado em requisições do servidor"

# Mudança visual
git commit -m "style: aplica identidade visual corporativa na sidebar"

# Refatoração
git commit -m "refactor: extrai lógica de entrega para delivery.service"

# Testes
git commit -m "test: adiciona testes unitários no auth.service"

# CI/CD
git commit -m "ci: adiciona pipeline de lint e build no GitHub Actions"

# Documentação
git commit -m "docs: atualiza AGENTS.md com padrões de dark mode"
```

### Regras da mensagem de commit

- Máximo de 72 caracteres na linha do título
- Sempre em português
- Imperativo no presente: "adiciona", "corrige", "remove" — não "adicionado" ou "adicionei"
- Sem ponto final no título
- Corpo do commit separado do título por uma linha em branco quando necessário

---

## Pull Requests

### Título

Seguir o mesmo padrão de commit:

```
feat: adiciona filtro por período na listagem de entregas
```

### Descrição obrigatória

```markdown
## O que foi feito
Descreva resumidamente o que foi implementado.

## Como testar
1. Passo a passo para validar a feature ou fix.

## Checklist
- [ ] Código tipado (sem any)
- [ ] Sem console.log esquecido
- [ ] Testes adicionados ou atualizados
- [ ] Pipeline passando
- [ ] AGENTS.md atualizado se necessário
```

### Regras

- PR deve ter no mínimo uma aprovação antes do merge
- Pipeline de CI deve estar verde
- Branches com conflito devem ser resolvidas antes do merge
- Squash merge para manter o histórico limpo na develop

---

## Tags e releases

Versionar as releases com **Semantic Versioning**:

```
v1.0.0  — release inicial
v1.1.0  — nova funcionalidade (minor)
v1.1.1  — correção de bug (patch)
v2.0.0  — breaking change (major)
```

### Criar uma tag

```bash
git tag -a v1.0.0 -m "release: versão inicial do tracklog"
git push origin v1.0.0
```

---

## O que nunca fazer

| Proibido | Alternativa |
|---|---|
| Commitar diretamente na `main` | Abrir PR da `develop` para `main` |
| Commitar diretamente na `develop` | Criar branch de feature e abrir PR |
| Commitar `.env` ou secrets | Usar `.gitignore` e variáveis de ambiente |
| `git push --force` na `main` ou `develop` | Resolver conflitos localmente |
| Commits com mensagem vaga ("fix", "update", "wip") | Seguir Conventional Commits |
| Misturar múltiplas responsabilidades em um commit | Commits atômicos por responsabilidade |

---

## .gitignore obrigatório

### tracklog-api

```
node_modules/
dist/
.env
*.log
```

### tracklog-web

```
node_modules/
.next/
.env.local
.env*.local
*.log
```

---

## Referências

- [Conventional Commits](https://www.conventionalcommits.org)
- [Semantic Versioning](https://semver.org)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model)