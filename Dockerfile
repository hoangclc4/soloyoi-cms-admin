# base image
FROM node:8.11.3

# set working directory
WORKDIR /CmsAdmin

COPY . /CmsAdmin

RUN yarn

CMD [ "yarn", "start:stg" ]
