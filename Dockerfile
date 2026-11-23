FROM node:20-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

COPY app.js taxCalculator.js ./
COPY spec ./spec

ENV PORT=3000
EXPOSE 3000

CMD ["npm", "start"]
