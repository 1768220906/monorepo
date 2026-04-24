FROM node:20-alpine AS builder

WORKDIR /workspace

RUN corepack enable

COPY . .

RUN pnpm install --no-frozen-lockfile
RUN pnpm --filter @monorepo/server build

FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

RUN corepack enable

COPY . .
RUN pnpm install --prod --filter @monorepo/server... --no-frozen-lockfile
COPY --from=builder /workspace/apps/server/dist ./apps/server/dist

EXPOSE 3000

CMD ["pnpm", "--filter", "@monorepo/server", "start"]
