FROM node:24.0.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=./prisma/schema.prisma

EXPOSE 8000

CMD npm run start:dev