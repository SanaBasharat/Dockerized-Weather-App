FROM node:lts-alpine

WORKDIR  /home/app/call-weather-server

COPY package*.json .

RUN ["npm", "install"]

COPY . .

CMD ["npm", "start"]