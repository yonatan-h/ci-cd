FROM node:24-slim

WORKDIR /usr/src/app

COPY package*.json ./

COPY .next/standalone/package*.json .next/standalone/

RUN npm install --verbose

RUN cd .next/standalone && npm install --verbose

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:standalone"]
