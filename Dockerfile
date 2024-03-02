FROM node:20-alpine3.18

WORKDIR /app

COPY . .

CMD [ "npm", "run", "start:dev" ]