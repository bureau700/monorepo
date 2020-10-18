FROM node:12-alpine

WORKDIR /app

COPY . /app

# RUN npm run build

CMD yarn ci:test:e2e
