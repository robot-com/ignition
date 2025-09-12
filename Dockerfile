FROM node:22-alpine AS builder

WORKDIR /app

# Install pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Copy source
COPY . .

# Install deps (with cache)
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

# Run build
RUN pnpm -r build

FROM node:22-alpine

# Set environment variables
ENV NODE_ENV=production
ENV DOCKER=1

# Copy server bundle
COPY --from=builder /app/apps/server/dist /apps/server/dist

# Frontend files
COPY --from=builder /app/apps/web/dist /apps/server/public

WORKDIR /apps/server

CMD ["node", "dist/main.cjs"]
