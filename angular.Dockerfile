FROM node:16

WORKDIR /app

EXPOSE 4200
FROM node:16

WORKDIR /app

COPY angular/acme-explorer/package.json .

RUN npm install

EXPOSE 4200

CMD npm start