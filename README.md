# Seazone — Guia Digital do Hóspede

Monorepo com backend Fastify + frontend Next.js + PostgreSQL, orquestrado por Docker Compose.

## Pré-requisitos

- Docker e Docker Compose instalados
- Git

## Subir o ambiente

```bash
cp .env.example .env
docker compose up --build
```

Serviços disponíveis:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001
- Saúde do backend: http://localhost:3001/health

## Quality gates

```bash
npm install                 # instala ferramentas da raiz (ESLint, Prettier, Vitest, Playwright)
npm run sync-types          # sincroniza DTOs do backend para o frontend
npm run lint                # ESLint (falha em qualquer `any`)
npm run format              # Prettier
npm run test                # Vitest (unitário)
npm run test:e2e            # Playwright headed (abre browser)
```

## Estrutura

```
/
├── backend/          # Fastify + Prisma + Zod
├── frontend/         # Next.js 14+ App Router
├── e2e/              # Testes Playwright
├── docker-compose.yml
└── tsconfig.base.json
```

Guia de arquitetura: `.specify/memory/constitution.md`
