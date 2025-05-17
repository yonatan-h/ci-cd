FROM node:24-slim

WORKDIR /usr/src/app


COPY package*.json ./


RUN npm install --verbose

COPY . .

RUN npm run build


EXPOSE 3000


CMD ["npm", "start"]
# no watch all