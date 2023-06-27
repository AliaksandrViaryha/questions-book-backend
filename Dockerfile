FROM node:18-slim as build
WORKDIR /usr/src/app
COPY . .
RUN npm install
RUN npm run build

FROM node:18-slim
WORKDIR /usr/src/app
ENV NODE_ENV production
COPY package.json package-lock.json .env ./
RUN npm ci --only=production
COPY --from=build /usr/src/app/dist ./dist
ENTRYPOINT ["node", "./dist/main.js"]
