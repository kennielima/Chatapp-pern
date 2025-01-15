FROM node:16

ARG RAILWAY_SERVICE_NAME
RUN echo $RAILWAY_SERVICE_NAME



WORKDIR /usr/backend/src

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
