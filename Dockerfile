FROM node:16

# Setting working directory. All the path will be relative to WORKDIR
WORKDIR /app/

# Installing dependencies
COPY package*.json /app/
RUN yarn install
RUN yarn global add serve
# Copying source files
COPY . /app/

# Building app
RUN yarn run build

EXPOSE 3000

# Running the app
CMD [ "serve","-s", "build"]
