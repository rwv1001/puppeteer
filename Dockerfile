FROM node:latest as build-stage

RUN apt update
RUN apt-get install chromium -y
RUN apt-get install alsa-utils -y
#RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
#RUN dpkg -i google-chrome-stable_current_amd64.deb; apt-get -fy install
#RUN apt-get install chromium-browser
#RUN apt-get install -y python3 make gcc g++ 

# Install google-chrome-stable
#RUN apt-get update && apt-get install gnupg wget -y && \
#  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
#  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
#  apt-get update && \
#  apt-get install google-chrome-stable -y --no-install-recommends && \
#  rm -rf /var/lib/apt/lists/*

# Create a user with name 'app' and group that will be used to run the app
RUN groupadd -r app && useradd -rm -g app -G audio,video app

WORKDIR /home/app

# Copy and setup your project 

COPY package.json .

RUN npm install

COPY . ./

COPY alsa.conf /usr/share/alsa/alsa.conf

# Give app user access to all the project folder
RUN chown -R app:app /home/app

RUN chmod -R 777 /home/app

#USER app

CMD ["node", "serverCall.js"]
