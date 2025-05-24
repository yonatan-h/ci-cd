FROM node:24-slim

WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --verbose

COPY . .

RUN npm run build

RUN cp -r public .next/standalone/ && cp -r .next/static .next/standalone/.next/

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
# no watch all
