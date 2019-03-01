FROM node:7
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install -g nodemon
COPY . /app
CMD ["nodemon","-L","server.js"]
EXPOSE 3000
