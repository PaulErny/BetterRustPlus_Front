FROM node:21-alpine3.18 as BetterRustPlus_front

COPY . ./app

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

RUN npm install

CMD ["npm", "start"]