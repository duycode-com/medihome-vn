FROM node:16.16-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent
COPY ./build ./build
CMD ["npm", "run", "start"]