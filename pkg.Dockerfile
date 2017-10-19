FROM ubuntu

RUN mkdir -p /app && mkdir -p /root/.youkuohao/cis/public
WORKDIR /app

COPY build/cms-linux /app
COPY packages/web/index.html /root/.youkuohao/cis/public

EXPOSE 8050

CMD [ "/app/cis" ]
