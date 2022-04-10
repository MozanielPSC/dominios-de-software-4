FROM mhart/alpine-node:16.4.2
WORKDIR /usr/app
COPY package.json ./
COPY . .
RUN yarn
EXPOSE 3333
CMD ["yarn","run", "dev"]