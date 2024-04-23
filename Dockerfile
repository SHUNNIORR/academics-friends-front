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
COPY --from=builder /app/dist/nginx-custom.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# When the container starts, replace the env.js with values from environment variables
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]
