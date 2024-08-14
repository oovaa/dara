FROM node:18-alpine

RUN mkdir -p /dara
WORKDIR /dara

COPY . .

RUN npm install

EXPOSE 8000

ENTRYPOINT [ "node", "index.js" ]