FROM node:16.18-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install --production --silent
COPY ./build ./build
CMD ["npm", "run", "start"]
