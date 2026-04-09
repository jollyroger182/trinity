FROM oven/bun:latest

WORKDIR /app

# Copy everything
COPY . .

# Build the app using pre-existing node_modules
RUN bun run build

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD bun -e "const res = await fetch('http://localhost:3000').catch(() => ({ok: false})); process.exit(res.ok ? 0 : 1)" || true

# Start the app
CMD ["bun", "run", "build/index.js"]
