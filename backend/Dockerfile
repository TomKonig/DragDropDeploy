###### Backend Dockerfile (multi-stage, minimal, non-root, prod deps only) ######

ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION} AS base
WORKDIR /app
ENV CI=true\
		TINI_VERSION=v0.19.0

FROM base AS deps
# Copy only manifest files for dependency resolution
COPY package.json ./
COPY package-lock.json* ./
COPY .npmrc* ./
RUN npm ci --ignore-scripts

FROM deps AS build
COPY . .
RUN npm run build

# Production deps only (prune devDependencies after build)
FROM deps AS prod-deps
RUN npm prune --production

FROM node:${NODE_VERSION} AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Copy production node_modules
COPY --from=prod-deps /app/node_modules ./node_modules
# Copy built dist and minimal package metadata (lockfile optional)
COPY --from=build /app/dist ./dist
COPY package.json ./

# Security hardening
RUN addgroup -S ddd && adduser -S ddd -G ddd \
	&& chown -R ddd:ddd /app \
	&& apk add --no-cache dumb-init \
	&& find /app/node_modules -type f -name "*.node" -exec chmod 0644 {} + \
	&& chmod -R go-w /app
USER ddd

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 CMD node -e 'fetch("http://localhost:3000/health").then(r=>{if(r.ok)process.exit(0);process.exit(1)}).catch(()=>process.exit(1))' || exit 1

CMD ["dumb-init", "node", "dist/main.js"]
