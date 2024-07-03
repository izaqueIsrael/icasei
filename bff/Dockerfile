FROM node:20.15.0

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN ls -la /app

RUN npm run build

RUN ls -la /app/dist

CMD ["node", "dist/index.js"]
