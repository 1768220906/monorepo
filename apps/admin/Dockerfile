FROM node:20-alpine AS builder

WORKDIR /workspace

RUN corepack enable

COPY . .

RUN pnpm install --no-frozen-lockfile
RUN pnpm --filter @monorepo/admin build

FROM nginx:1.27-alpine

COPY --from=builder /workspace/apps/admin/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
