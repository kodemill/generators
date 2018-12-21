FROM node:10-alpine
LABEL maintainer="<%= author.name %> <<%= author.email %>>"

USER node
WORKDIR /home/node/app

COPY ./package* ./
RUN npm install --production && \
    npm cache clean --force
COPY . .

EXPOSE 3000
ENV NODE_ENV=production
CMD npm start
