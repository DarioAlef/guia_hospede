# Seazone — Guia Digital do Hóspede

Solução de guia digital personalizado com IA para propriedades.

## 🚀 Rodar Localmente

```bash
# Setup
cp .env.example .env
npm install && npm --prefix backend install && npm --prefix frontend install

# Start
docker-compose up -d
cd backend && npx prisma migrate dev && npm run dev &
npm --prefix frontend run dev
```

Frontend: http://localhost:3001  
Backend: http://localhost:3000

## 📚 Documentação

Veja `/docs` para guia completo (arquitectura, features, deploy, testes).

```bash
cd docs && npx mint dev
```

## 🧪 Testes

```bash
npm --prefix backend run test:unit
npm --prefix frontend run test:unit
npm --prefix frontend run test:e2e
```

## 📋 Stack

- Frontend: Next.js 14, React 18, Tailwind CSS
- Backend: Fastify 4, Prisma 5, Zod 3
- IA: Groq API + Vercel AI SDK
- Database: PostgreSQL 16
- Docs: Mintlify + MDX
