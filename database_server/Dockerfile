FROM node:8
WORKDIR /usr/src/kiddolab/database_server
COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 8080
CMD ["npm", "start"]