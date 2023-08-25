FROM node

COPY package.json /app/

COPY ./ /app/

WORKDIR /app

RUN yarn

CMD ["node", "server.js"]