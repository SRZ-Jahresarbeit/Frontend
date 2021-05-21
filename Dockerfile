FROM node:12-alpine as builder

WORKDIR /src

COPY package*.json ./

RUN npm ci

COPY . .

RUN npx tailwindcss-cli@latest build src/styles.css -o src/tailwind.css

FROM nginx:stable-alpine

COPY --from=builder /src/src/ /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
