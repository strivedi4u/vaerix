# Build stage
FROM node:20-bookworm-slim AS builder

WORKDIR /app

# Copy only package files first (better Docker cache)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --no-audit --no-fund

# Ensure platform-native bindings exist for glibc Linux builds (DigitalOcean builder).
# Vite 8 uses Rolldown and LightningCSS, which rely on platform-specific packages.
RUN ROLLDOWN_VERSION="$(node -p 'require("./node_modules/rolldown/package.json").version')" \
  && LIGHTNINGCSS_VERSION="$(node -p 'require("./node_modules/lightningcss/package.json").version')" \
  && npm install --no-save --no-audit --no-fund --no-package-lock \
    "@rolldown/binding-linux-x64-gnu@${ROLLDOWN_VERSION}" \
    "lightningcss-linux-x64-gnu@${LIGHTNINGCSS_VERSION}"


# Copy source
COPY . .

# Build
RUN npm run build

# Runtime stage
FROM node:20-bookworm-slim

WORKDIR /app

# Static file server
RUN npm install -g serve

COPY --from=builder /app/dist ./dist

EXPOSE 8080

CMD ["sh", "-c", "serve -s dist -l ${PORT:-8080}"]
