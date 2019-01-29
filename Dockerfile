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

# add app
COPY ./k8s-training-app .

# install and cache app dependencies
RUN npm install -s
RUN npm install -g @angular/cli@7.2.1 -s
RUN npm install ng4-loading-spinner -s

RUN npm update

#create new user
RUN groupadd -g 999 appuser && useradd -r -u 999 -g appuser appuser
USER appuser

# Run tests and start app. 
CMD  ng test --browsers Chrome_without_sandbox --watch=false && ng serve --host 0.0.0.0 --port 4200 --disable-host-check
