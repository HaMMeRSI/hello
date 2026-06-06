# ============================================
# Stage 1: Build - Install deps and build Astro
# ============================================
FROM node:22-slim AS builder

RUN corepack enable && corepack prepare pnpm@11.1.2 --activate

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm-sagi-hammer,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

# ============================================
# Stage 2: Serve - Minimal nginx image
# ============================================
FROM nginx:alpine AS runner

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3080

CMD ["nginx", "-g", "daemon off;"]
