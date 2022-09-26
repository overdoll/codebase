FROM gcr.io/bazel-public/ubuntu2004-java11@sha256:446ebb3ff63accd503177199be691114c3bbdfeeb97371caa648148e8b52b6f1

USER root

RUN apt-get update
RUN apt update --allow-insecure-repositories
RUN yes | apt install ffmpeg
RUN yes | apt-get install libvips libvips-dev libvips-tools

ENV NVM_DIR /root/.nvm
ENV NODE_VERSION 16.5.0

RUN mkdir /root/.nvm

RUN curl https://raw.githubusercontent.com/creationix/nvm/v0.35.2/install.sh | bash && . $NVM_DIR/nvm.sh && nvm install $NODE_VERSION && nvm alias default $NODE_VERSION && nvm use default

RUN cp /root/.nvm/versions/node/v16.5.0/bin/node /usr/bin/node

RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
RUN ln -s /root/.yarn/bin/yarn /usr/bin/yarn
RUN apt clean

RUN wget https://github.com/google/go-containerregistry/releases/download/v0.9.0/go-containerregistry_Linux_x86_64.tar.gz
RUN tar -xzf go-containerregistry_Linux_x86_64.tar.gz
RUN rm go-containerregistry_Linux_x86_64.tar.gz
RUN mv crane /bin

RUN apt install python3-yaml
RUN python3 -m pip install redis
RUN python3 -m pip install requests

# install sentry
RUN curl -sL https://sentry.io/get-cli/ | SENTRY_CLI_VERSION="2.1.0" bash

# install AWS CLI
RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install
