FROM node:latest

# Create work directory
WORKDIR /usr/src/app

# Install runtime dependencies
RUN npm install yarn -g

# Copy app source to work directory
RUN mkdir /usr/src/app/commands
ADD commands /usr/src/app/commands/

RUN mkdir /usr/src/app/src
ADD src /usr/src/app/src/

COPY .env /usr/src/app/
COPY nodemon.json /usr/src/app/
COPY package-scripts.js /usr/src/app/
COPY package.json /usr/src/app/
COPY tsconfig.json /usr/src/app/
COPY tslint.json /usr/src/app/

# Install app dependencies
RUN yarn install

# Build and run the app
CMD yarn start serve
