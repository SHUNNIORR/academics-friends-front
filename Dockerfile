FROM node:16-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

RUN ls -alt
#Stage 2
FROM nginx:1.17.1-alpine

WORKDIR /app

COPY --from=builder /app/dist/amigos-academicos-front /usr/share/nginx/html
#COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
