FROM node:18-alpine

RUN mkdir -p /dara
WORKDIR /dara

COPY . .

RUN npm install

ENV API_KEY="vMAjA6npjAdbYZJUegVrxGYzHfzOhWXlGznHSw8V" 

EXPOSE 8000

ENTRYPOINT [ "node", "index.js" ]