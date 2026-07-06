# Build stage
FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

ARG VITE_ORDERING_APP_DEMO_URL=https://www.almaalem.shop
ENV VITE_ORDERING_APP_DEMO_URL=$VITE_ORDERING_APP_DEMO_URL

RUN npm run build

# Production — nginx SPA
FROM nginx:alpine AS runner
RUN apk add --no-cache gettext

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/conf.d/default.conf.template
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN sed -i 's/\r$//' /docker-entrypoint.sh && chmod +x /docker-entrypoint.sh

ENV PORT=80
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -qO- "http://127.0.0.1:${PORT}/health" | grep -q ok || exit 1

ENTRYPOINT ["/docker-entrypoint.sh"]
