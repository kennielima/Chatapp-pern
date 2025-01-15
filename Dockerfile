FROM node:16

WORKDIR /usr/backend/src

COPY package*.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
