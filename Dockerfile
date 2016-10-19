FROM node:6-slim
MAINTAINER avi


RUN npm install gulp typings@1.3.3 yarn -g
EXPOSE 8080

COPY package.json yarn.lock /app/

WORKDIR /app
RUN yarn


LABEL avi.version=1.0.81

COPY tsconfig.json package.json gulpFile.js /app/
COPY src /app/src

RUN gulp compile-ts

ENTRYPOINT ["node", "dist/index.js"]
