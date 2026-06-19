FROM node:20-alpine

WORKDIR /docs

# git é requerido por algumas operações do CLI mint
RUN apk add --no-cache git

# Instala o CLI do Mintlify de forma reproduzível
COPY package.json package-lock.json* ./
RUN npm install -g mint

# Copia a documentação (docs.json + páginas .mdx)
COPY . .

# Railway injeta $PORT em runtime; bind em 0.0.0.0 para ser acessível
ENV PORT=3000
EXPOSE 3000

CMD ["sh", "-c", "mint dev --port ${PORT} --host 0.0.0.0"]
