FROM node:13 as builder
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:13
COPY --from=builder . .
EXPOSE 3000
CMD [ "node", "__sapper__/build" ]