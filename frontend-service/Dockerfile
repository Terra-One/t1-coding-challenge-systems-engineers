FROM node:24.11.0-slim

WORKDIR /app

COPY package*.json ./

RUN npm ci

EXPOSE 3001

COPY . .

RUN npm run build

CMD ["npm", "start"]