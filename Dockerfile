FROM node:20-alpine as build

RUN mkdir -p /opt/src
WORKDIR /opt/src

COPY package.json package-lock.json .npmrc ./

RUN npm ci && npm cache clean --force

COPY . .

RUN npm run build
RUN npm prune

# Run
FROM node:20-alpine

WORKDIR /opt/src

COPY --from=build /opt/src/.output ./.output

CMD [ "node", ".output/server/index.mjs" ]