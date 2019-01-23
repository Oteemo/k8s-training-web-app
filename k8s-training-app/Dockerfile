#base image
FROM node:9.6.1

# install chrome for protractor tests
RUN wget -q -O - https://dl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN echo 'deb http://dl.google.com/linux/chrome/deb/ stable main' >> /etc/apt/sources.list
RUN apt-get update && apt-get install --no-install-recommends -y google-chrome-stable

# set working directory
RUN mkdir /usr/src/app
WORKDIR /usr/src/app

# add `/usr/src/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install and cache app dependencies
COPY package.json /usr/src/app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.2.1

# add app
COPY . /usr/src/app

# Start app. 
# 'ci' is a custom command that runs tests and serves the application at host 0.0.0.0 and port 4200 
# It can be located in the package.json file of the application. 
CMD ng serve --host 0.0.0.0 --port 4200
