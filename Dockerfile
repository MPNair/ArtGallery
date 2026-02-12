FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

COPY tailwind.config.cjs ./
COPY src ./src
COPY public ./public

RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

COPY --from=builder /app/src ./src
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["node", "src/server.js"]

