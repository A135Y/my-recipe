# Stage 1: Build the server
FROM node:16-alpine AS build-server
WORKDIR /app
COPY ./server /app/server
COPY ./server/api/index.js /app/server/api/index.js
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci
COPY ./data/recipes.json /app/data/recipes.json
WORKDIR /app/server/api
RUN npm install -g nodemon

# Stage 2: Build the client
FROM node:16-alpine AS build-client
WORKDIR /app
COPY ./src /app/src
COPY ./package.json /app/package.json
COPY ./package-lock.json /app/package-lock.json
RUN npm ci
COPY ./public /app/public
COPY ./src /app/src
RUN npm run build

# Stage 3: Run the servers
FROM node:16-alpine AS run
WORKDIR /app
COPY --from=build-server /app /app
COPY --from=build-client /app/build /app/public
COPY ./server/database /app/server/database
WORKDIR /app/server/api
EXPOSE $PORT
CMD ["node", "index.js"]

# Start the client separately
FROM node:16-alpine AS start-client
WORKDIR /app
COPY --from=build-client /app /app
EXPOSE 4000
CMD ["npm", "start"]
