# Stage 1: Install dependencies
FROM node:24-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Stage 2: Build the application
FROM node:24-slim@sha256:55fb5f5a527ea2c5c4a95f963e48ef90aa38c7b346054fdc8ee9957a2b55d205 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production runner
FROM node:24-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 AS runner
WORKDIR /app

# Keep the pinned base image reproducible while applying Alpine security updates.
RUN apk upgrade --no-cache

ENV NODE_ENV=production

RUN rm -rf \
      /opt/yarn-v${YARN_VERSION} \
      /root/.cache/yarn \
      /root/.npm \
      /usr/local/lib/node_modules/npm \
    && rm -f \
      /usr/local/bin/npm \
      /usr/local/bin/npx \
      /usr/local/bin/yarn \
      /usr/local/bin/yarnpkg \
    && ! command -v npm \
    && ! command -v npx \
    && ! command -v yarn \
    && ! command -v yarnpkg \
    && node --version

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

ARG BUILD_REVISION=development
RUN printf '{"revision":"%s"}\n' "$BUILD_REVISION" > /app/public/deployment-version.json
LABEL org.opencontainers.image.revision=$BUILD_REVISION

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
