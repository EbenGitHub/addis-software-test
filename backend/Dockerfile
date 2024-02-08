FROM node:20-alpine AS builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --production=false

COPY . .

RUN yarn build


FROM node:20-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package.json /usr/src/app/yarn.lock ./
COPY --from=builder /usr/src/app/dist ./dist

RUN yarn install --frozen-lockfile --production=true

CMD ["yarn", "start:prod"]
