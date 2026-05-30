# Skill: Criar Página no tracklog-web

## Quando usar
Sempre que criar uma nova page.tsx dentro de app/(dashboard)/

## Checklist obrigatório
- [ ] Server Component por padrão (sem 'use client')
- [ ] Dados via apiServer de @/services/api.server
- [ ] Types de @/types/
- [ ] Tailwind: padrão bg-white rounded-xl border border-gray-100
- [ ] searchParams tipado como Promise<{...}> e aguardado com await
- [ ] Suspense em componentes com useSearchParams()
- [ ] Sem any, sem as string

## Estrutura base
\`\`\`tsx
export default async function NomePage() {
  const data = await apiServer.get<Tipo>('/rota')
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-900">Título</h1>
      ...
    </div>
  )
}
\`\`\`