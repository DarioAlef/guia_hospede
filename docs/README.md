# Documentação Mintlify — Como Editar e Manter

Esta documentação está em formato **MDX** (Markdown + React) e é servida pelo **Mintlify**.

## Estrutura

```
docs/
├── docs.json                 # Configuração: nome, tema, navegação, cores
├── Dockerfile                # Container para Railway
├── package.json              # Dependências (mint CLI)
│
├── index.mdx                 # Página inicial
│
├── overview/
│   ├── contexto.mdx          # Problema de negócio
│   ├── objetivo.mdx          # Missão e 3 requisitos
│   └── criterios-avaliacao.mdx # Mapeamento com critérios
│
├── arquitetura/
│   ├── visao-geral.mdx       # Monorepo, fluxos
│   ├── stack.mdx             # Stack por camada
│   └── vertical-slices.mdx   # Padrão de organização
│
├── funcionalidades/
│   ├── visualizacao-guia.mdx # RF1
│   ├── guia-experiencias-ia.mdx # RF2
│   └── assistente-virtual.mdx # RF3
│
├── decisoes-tecnicas/
│   ├── decisoes.mdx          # 7 ADRs principais
│   └── tratamento-erros.mdx  # 5 estratégias de error handling
│
└── guia-de-uso/
    ├── quickstart.mdx        # Rodar localmente (8 passos)
    ├── variaveis-ambiente.mdx # Configuração de env vars
    ├── testes.mdx            # Vitest + Playwright
    └── deploy-railway.mdx    # Deployment (7 passos)
```

Total: **15 páginas MDX** organizadas em 5 grupos (Visão Geral, Arquitetura, Funcionalidades, Decisões Técnicas, Guia de Uso).

---

## Como Editar Páginas

### 1. Abrir Arquivo MDX

Cada página é um arquivo `.mdx` simples. Exemplo:

```bash
# Editar página de Contexto
code docs/overview/contexto.mdx
```

### 2. Frontmatter (Cabeçalho)

Cada arquivo começa com:

```yaml
---
title: Contexto de Negócio
description: O problema do folheto físico manual
---
```

**Obrigatório**:
- `title` — Título exibido no topo da página e no menu
- `description` — Subtítulo para meta tags (SEO)

### 3. Conteúdo em Markdown

```markdown
# Contexto de Negócio

## O Problema

A Seazone gerencia...

### Limitações

- ❌ Manual e propenso a erros
- ❌ Não escala

## Solução

Em vez de folheto físico...

> **Nota**: Use > para callouts
```

### 4. Componentes Mintlify

Adicione componentes ricos em MDX:

#### Cards

```mdx
<Card
  title="Para o Hóspede"
  icon="smile"
>
  Experiência digital moderna, informações relevantes
</Card>
```

#### CardGroup (lado a lado)

```mdx
<CardGroup cols={2}>
  <Card title="Desktop" icon="desktop">
    1920px, layout multi-coluna
  </Card>
  <Card title="Mobile" icon="mobile">
    375px, stack vertical
  </Card>
</CardGroup>
```

#### Tabs

```mdx
<Tabs>
  <Tab title="Backend">
    Conteúdo do tab 1
  </Tab>
  <Tab title="Frontend">
    Conteúdo do tab 2
  </Tab>
</Tabs>
```

#### Callout (aviso/info)

```mdx
<Info>
  **Importante**: Esta seção descreve...
</Info>

<Warning>
  **Atenção**: Nunca fazer...
</Warning>

<Tip>
  **Dica**: Você pode otimizar...
</Tip>
```

#### Code Blocks com Syntax Highlighting

````mdx
```typescript
// Código TypeScript com highlight
const property = await service.getByCode('FLN001');
console.log(property.name);
```

```bash
# Comando bash
npm run dev
```
````

---

## Como Adicionar Nova Página

### Passo 1: Criar Arquivo MDX

```bash
# Exemplo: adicionar página de FAQ
touch docs/overview/faq.mdx
```

### Passo 2: Adicionar Frontmatter

```yaml
---
title: Perguntas Frequentes
description: Respostas rápidas sobre o projeto
---

# Perguntas Frequentes

## Como rodar localmente?

Veja [Quickstart](/guia-de-uso/quickstart).
```

### Passo 3: Registrar na Navegação (docs.json)

Abrir `docs/docs.json` e adicionar a página ao grupo apropriado:

```json
{
  "navigation": [
    {
      "group": "Visão Geral",
      "pages": [
        "index",
        "overview/contexto",
        "overview/objetivo",
        "overview/faq"  // ← NOVA PÁGINA
      ]
    }
  ]
}
```

⚠️ **Importante**: Usar path **sem `.mdx`** (ex: `overview/faq`, não `overview/faq.mdx`)

### Passo 4: Testar Localmente

```bash
cd docs
npx mint dev
# Abre em http://localhost:3000
```

Editar arquivo `.mdx` e salvar — preview recarrega automaticamente.

---

## Como Validar Links

Antes de publicar, verificar que não há links quebrados:

```bash
cd docs
npx mint broken-links
```

**Esperado**: `0 broken links`

**Se houver erros**:
```
broken-links found:
  - /guia-de-uso/quickstart → /guia-de-uso/quickstart-typo (not found)
```

→ Corrigir em `.mdx` e rodar novamente.

---

## Padrões de Escrita

### ✅ Bom

```mdx
# Titulo Claro

Parágrafo breve, sem jargão.

## Seção

Explicar o conceito em 1-2 parágrafos.

> Use > para highlightear pontos importantes

- ✅ Fazer isso
- ❌ Não fazer isso

<Card title="Exemplo" icon="code">
Conteúdo em card para destacar
</Card>
```

### ❌ Ruim

```mdx
# Lorem Ipsum

Muito texto técnico sem quebras.
Parágrafos longos demais.
Sem estrutura visual.
Não usa componentes Mintlify.
```

### Convenções

1. **Português do Brasil** — Sempre PT-BR (não EN, não PT-PT)
2. **Títulos em Título Case** — "Contexto de Negócio", não "contexto de negócio"
3. **Listas com ✅/❌** — Para comparações claras
4. **Links com [texto](/caminho)** — Caminhos relativos, sem `.mdx`
5. **Código em blocks** — Sempre usar ` ``` ` para código multi-linha
6. **Emojis moderadamente** — 🔓 para acesso, 📝 para dados, etc. (não abuse)

---

## Rastreabilidade: Referenciar Specs de Origem

Cada página deve referenciar as specs/fases de origem:

```mdx
---
title: Visualização do Guia
description: RF1
---

# RF1 — Visualização do Guia

Requisito Funcional 1 do desafio...

**Specs de Origem**: 
[feat/property-core](/arquitetura/vertical-slices.mdx), 
[feat/property-ui-redesign](/arquitetura/vertical-slices.mdx)
```

Isso permite que leitores rastreiem "de onde vem essa feature" e entendam a evolução.

---

## SEO e Metadados

Cada página tem:

```yaml
---
title: Contexto de Negócio          # Aparece em <h1> e <title>
description: O problema...          # Aparece em <meta name="description">
---
```

**Boas práticas**:
- `title`: 30-60 caracteres, descritivo
- `description`: 120-160 caracteres, resumo do que é a página

---

## Deployment Local vs Railway

### Local (Preview)

```bash
cd docs
npx mint dev
# http://localhost:3000
```

**Uso**: Editar, testar links, validar markup.

### Railway

```bash
# Commit e push para main
git add docs/
git commit -m "docs: adicionar página FAQ"
git push origin main

# Railway faz deploy automático
# Acessar: https://docs-xxxx.railway.app
```

**Dockerfile** (já configurado):
```dockerfile
FROM node:20-alpine
RUN npm install -g mint
COPY . .
CMD ["mint", "dev", "--port", "$PORT", "--host", "0.0.0.0"]
```

---

## Problemas Comuns

### "Page not found" no Menu

**Causa**: Página listada em `docs.json` mas arquivo não existe.

**Solução**:
```bash
# Verificar arquivo existe
ls docs/overview/faq.mdx

# Se não existir, criar
touch docs/overview/faq.mdx
```

### "lint broken-links" retorna erro

**Causa**: Link em arquivo `.mdx` aponta para página inexistente.

**Exemplo**:
```mdx
Veja [Quickstart](/guia-uso/quickstart)  # ← Caminho errado
```

**Solução**:
```mdx
Veja [Quickstart](/guia-de-uso/quickstart)  # ← Correto
```

### Componente Mintlify não renderiza

**Causa**: Sintaxe MDX incorreta.

```mdx
❌ Errado
<Card title="Exemplo">
Conteúdo
</Card>

✅ Correto
<Card title="Exemplo" icon="code">
  Conteúdo
</Card>
```

### Arquivo `.mdx` não atualiza no preview

**Solução**:
```bash
cd docs
# Parar: Ctrl+C
# Rodar novamente:
npx mint dev
```

Clearing cache:
```bash
rm -rf .mint/
npx mint dev
```

---

## Checklist Antes de Publicar

- [ ] Todos os arquivos `.mdx` têm frontmatter (`title`, `description`)
- [ ] `docs.json` lista todas as páginas (sem `.mdx`)
- [ ] `npx mint broken-links` retorna 0 erros
- [ ] Páginas renderizam corretamente em http://localhost:3000
- [ ] Links internos usam caminhos corretos (ex: `/guia-de-uso/quickstart`)
- [ ] Nenhuma credencial real exposta (apenas placeholders)
- [ ] Escrita em PT-BR
- [ ] Componentes Mintlify usados corretamente (Card, Tabs, etc.)
- [ ] Página testa bem em mobile (375px) e desktop (1920px)
- [ ] Referências para specs de origem incluídas

---

## Recursos Úteis

- [Mintlify Documentation](https://mintlify.com/docs)
- [MDX Syntax](https://mdxjs.com/)
- [Componentes Mintlify](https://mintlify.com/docs/components)
- [Configuração docs.json](https://mintlify.com/docs/settings/global)

---

**Pronto!** Agora você sabe como manter e expandir a documentação. Happy writing! ✨
