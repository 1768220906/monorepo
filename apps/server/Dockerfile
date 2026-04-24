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

COPY --from=builder /workspace/apps/server/package.json ./package.json
COPY --from=builder /workspace/apps/server/dist ./dist
RUN pnpm install --prod --no-frozen-lockfile

EXPOSE 3000

CMD ["node", "dist/index.js"]
