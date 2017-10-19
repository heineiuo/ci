FROM node:8.4.0-alpine

RUN mkdir -p /app && mkdir -p /root/.cis/public
WORKDIR /app

COPY packages/server/package.json /app
COPY packages/server/index.js /app
COPY packages/web/index.html /root/.cis/public

RUN npm install --registry=http://registry.npm.taobao.org \
  && rm -rf /tmp/* \
  && rm -rf /root/.npm/
  
EXPOSE 8050

CMD [ "node", "index.js" ]
