FROM node:8.9.4

RUN useradd --user-group --create-home --shell /bin/false app &&\
  npm install --global npm@6.4.1
ENV HOME=/home/app
COPY package.json npm-shrinkwrap.json $HOME/restful_server/
RUN chown -R app:app $HOME/*
USER app
WORKDIR $HOME/restful_server
RUN npm install --silent --progress=false
USER root
COPY . $HOME/restful_server
RUN chown -R app:app $HOME/*
USER app

CMD ["npm", "start"]