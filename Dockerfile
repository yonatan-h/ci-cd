FROM node:24-slim

WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --verbose

COPY . .

EXPOSE 3000


WORKDIR /usr/src/app/.next/standalone
RUN npm install --production --verbose
EXPOSE 3000
CMD ["node", "server.js"]
