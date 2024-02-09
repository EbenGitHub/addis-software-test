FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=false

COPY . .

ENV VITE_BACKEND_URL='/api/'
RUN yarn build


FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/dist ./dist

RUN yarn install --frozen-lockfile --production=true

CMD ["yarn", "preview", "--port", "5174"]
