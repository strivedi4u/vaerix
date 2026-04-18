# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Work around npm optional-deps edge cases where Rolldown's platform binding
# may not be present in the image (Vite 8 depends on Rolldown).
RUN ROLLDOWN_VERSION="$(node -p "require('./node_modules/rolldown/package.json').version")" \
  && npm install --no-save --no-audit --no-fund "@rolldown/binding-linux-x64-musl@${ROLLDOWN_VERSION}"

# Ensure LightningCSS native binding is available on Alpine/musl (used by Vite CSS minification).
RUN LIGHTNINGCSS_VERSION="$(node -p "require('./node_modules/lightningcss/package.json').version")" \
  && npm install --no-save --no-audit --no-fund "lightningcss-linux-x64-musl@${LIGHTNINGCSS_VERSION}"

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install serve to run the static site
RUN npm install -g serve

# Copy built application from builder
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "const port = process.env.PORT || 8080; require('http').get({ host: '127.0.0.1', port, path: '/' }, (r) => { if (r.statusCode !== 200) process.exit(1); }).on('error', () => process.exit(1));"

# Start the application
CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]
