# This image will be based on the oficial nodejs docker image
FROM node:12.13.1

RUN npm install -g @quasar/cli

# Set in what directory commands will run
RUN mkdir -p /usr/src/CmsAdmin
WORKDIR /usr/src/CmsAdmin

# Put all our code inside that directory that lives in the container
COPY . .

# Use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
COPY package.json ./

RUN yarn install

# Tell Docker we are going to use this port
EXPOSE 8080

# The command to run our app when the container is run
RUN quasar build
CMD quasar serve --history -p 8080 -c 120 dist/spa
