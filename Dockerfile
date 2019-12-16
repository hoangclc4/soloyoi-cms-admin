# base image
FROM node:12.13.1

# set working directory
RUN mkdir -p /usr/src/CmsAdmin
WORKDIR /usr/src/CmsAdmin

COPY . .
RUN yarn install
RUN npm install -g @quasar/cli

# Bundle app source
EXPOSE 8080
CMD quasar dev
