FROM node:alpine

WORKDIR /app

RUN npm init -y
RUN npm i postgraphile express cors postgraphile-plugin-connection-filter

COPY index.js index.js

CMD node index.js