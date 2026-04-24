FROM node:20-alpine AS builder

WORKDIR /workspace

RUN corepack enable

COPY . .

RUN pnpm install --no-frozen-lockfile
RUN pnpm --filter @monorepo/server build
RUN pnpm deploy --filter @monorepo/server --prod /prod/server

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

COPY --from=builder /prod/server ./

EXPOSE 3000

CMD ["node", "dist/index.js"]
