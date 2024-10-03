ARG NODE_VERSION=20.11.0
ARG PORT=3000

FROM node:${NODE_VERSION}-slim AS base
ENV NODE_ENV=production
WORKDIR /src

FROM base AS build
COPY --link package.json package-lock.json ./
RUN npm install --production=false
COPY --link . .
RUN npm run build && npm prune

FROM base
ENV PORT=$PORT
COPY --from=build /src/.output /src/.output
CMD ["node", ".output/server/index.mjs"]

# Retrived from https://markus.oberlehner.net/blog/running-nuxt-3-in-a-docker-container/