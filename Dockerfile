FROM node:20-alpine AS development-dependencies-env
COPY . /app
WORKDIR /app
RUN yarn install --frozen-lockfile
# RUN npm ci

FROM node:20-alpine AS production-dependencies-env
COPY ./package.json yarn.lock /app/
WORKDIR /app
RUN yarn install --frozen-lockfile --production
# RUN npm ci --omit=dev

FROM node:20-alpine AS build-env
COPY . /app/
COPY --from=development-dependencies-env /app/node_modules /app/node_modules
WORKDIR /app

ADD prisma .
RUN npx prisma generate

RUN yarn build
# RUN npm run build

FROM node:20-alpine
COPY ./package.json yarn.lock /app/
COPY --from=production-dependencies-env /app/node_modules /app/node_modules
COPY --from=build-env /app/node_modules/.prisma /app/node_modules/.prisma
COPY --from=build-env /app/build /app/build
WORKDIR /app
CMD ["yarn", "start"]
# CMD ["npm", "run", "start"]