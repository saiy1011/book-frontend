# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

# Kleines Image mittels "standalone"-Konfiguration von "Next.js"
# Befehl: docker buildx build --sbom true --no-cache --tag swews23gr2/spa:2023.12.0-distroless .

# ---------------------------------------------------------------------------------------
# S t a g e   b u i l d e r
# ---------------------------------------------------------------------------------------
ARG NODE_VERSION=20.10.0
FROM node:${NODE_VERSION}-bookworm-slim AS builder

WORKDIR /home/node

COPY package.json package-lock.json next.config.js tsconfig*.json ./
COPY api ./api
COPY app ./app
COPY components ./components
COPY context ./context
COPY helper ./helper
COPY hooks ./hooks
COPY theme ./theme
COPY public ./public

RUN npm i -g --no-audit --no-fund npm

USER node

# TODO: Wie kann man diese Umgebungsvariable bei 'Next.js' mit 'Docker Compose' zur Laufzeit festlegen?
# Nach 'npm run build' nicht mehr änderbar
ENV NEXT_PUBLIC_BACKEND_SERVER_URL=https://localhost:3000/graphql

RUN <<EOF
npm ci --no-audit --no-fund
npm run build
EOF

# ------------------------------------------------------------------------------
# S t a g e   d u m b - i n i t
# ------------------------------------------------------------------------------
FROM debian:bookworm-slim AS dumb-init

RUN <<EOF
apt-get update
apt-get upgrade
apt-get install --no-install-recommends --yes dumb-init=1.2.5-2
apt-get autoremove --yes
apt-get clean --yes
rm -rf /var/lib/apt/lists/*
rm -rf /tmp/*
EOF

# ------------------------------------------------------------------------------
# S t a g e   F i n a l
# ------------------------------------------------------------------------------
FROM gcr.io/distroless/nodejs20-debian12:nonroot

LABEL org.opencontainers.image.title="swews23gr2-buch-spa" \
    org.opencontainers.image.description="SPA für 'buch' mit distroless-Image" \
    org.opencontainers.image.version="2023.10.0-distroless" \
    org.opencontainers.image.licenses="GPL-3.0-or-later" \
    org.opencontainers.image.authors="swews23gr2"

WORKDIR /opt/app

COPY --chown=nonroot:nonroot package.json ./
COPY --from=builder --chown=nonroot:nonroot /home/node/.next/standalone ./
COPY --from=builder --chown=nonroot:nonroot /home/node/public ./public
COPY --from=builder --chown=nonroot:nonroot /home/node/.next/static ./.next/static
COPY --from=dumb-init /usr/bin/dumb-init /usr/bin/dumb-init

USER nonroot

EXPOSE 3000

ENTRYPOINT ["dumb-init", "/nodejs/bin/node", "server.js"]
