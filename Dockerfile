FROM node:16

ARG RAILWAY_SERVICE_NAME
RUN echo $RAILWAY_SERVICE_NAME



WORKDIR /usr/backend/src

COPY package*.json ./
RUN npm install
RUN npx prisma generate

COPY backend/src/db/prisma ./backend/src/db/prisma/
COPY . .

CMD ["npm", "run", "dev"]
