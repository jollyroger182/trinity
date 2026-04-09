FROM oven/bun:latest AS builder

WORKDIR /app

COPY ./package.json .
COPY ./bun.lock .
RUN bun ci

COPY . .

RUN bun run build

FROM oven/bun:latest AS runner

WORKDIR /app

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/drizzle.config.ts ./
COPY --from=builder /app/drizzle ./drizzle

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun -e "const res = await fetch('http://localhost:3000').catch(() => ({ok: false})); process.exit(res.ok ? 0 : 1)" || true

CMD ["bun", "run", "build/index.js"]
