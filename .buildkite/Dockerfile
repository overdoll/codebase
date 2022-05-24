FROM gcr.io/bazel-public/ubuntu1804-java11@sha256:54af0180aaa595b2a10edce51e3ec71923b2e21c3964ffc0938c6f599f0b35e3

USER root

RUN apt update --allow-insecure-repositories
RUN yes | apt install ffmpeg

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
