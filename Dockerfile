FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build:client
RUN npm run build:server

EXPOSE 8080 8888
CMD ["node", "lib/server/index.js"]