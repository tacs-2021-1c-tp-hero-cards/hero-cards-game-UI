FROM node:14.17-alpine 

EXPOSE 5000

WORKDIR /hero-cards-game-UI

COPY package.json package-lock.json ./

RUN npm install

COPY src ./src

COPY tsconfig.json vite.config.ts index.html ./

RUN npm run build

ENTRYPOINT npm run serve
