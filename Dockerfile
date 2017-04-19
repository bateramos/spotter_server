FROM mhart/alpine-node:6

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

EXPOSE 3000

CMD [ "node", "server.js" ]