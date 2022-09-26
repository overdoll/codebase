FROM gcr.io/bazel-public/ubuntu2004-java11@sha256:446ebb3ff63accd503177199be691114c3bbdfeeb97371caa648148e8b52b6f1

USER root

RUN apt-get update
RUN apt update --allow-insecure-repositories
RUN yes | apt install ffmpeg

ENV DEBIAN_FRONTEND=noninteractive
ENV LD_LIBRARY_PATH /usr/local/lib
ENV PKG_CONFIG_PATH /opt/mozjpeg/lib64/pkgconfig

RUN  apt-get update \
  && apt-get install -y build-essential wget cmake autoconf automake libtool nasm make pkg-config git libpng-dev zlib1g-dev \
  && rm -rf /var/lib/apt/lists/*

# Install mozjpeg
ARG MOZJPEG_VERSION=4.1.1
ARG MOZJPEG_URL=https://github.com/mozilla/mozjpeg/archive

RUN wget ${MOZJPEG_URL}/v${MOZJPEG_VERSION}.tar.gz \
  && tar xzf v${MOZJPEG_VERSION}.tar.gz

# mozjpeg installs to /opt/mozjpeg by default
RUN cd mozjpeg-${MOZJPEG_VERSION} \
  && mkdir build \
  && cd build \
  && cmake -DCMAKE_INSTALL_PREFIX=/usr/local .. \
  && make \
  && make install

ARG VIPS_VERSION=8.13.0
ARG VIPS_URL=https://github.com/libvips/libvips/releases/download

# we must not use any packages which depend directly or indirectly on libjpeg,
# since we want to use our own mozjpeg build
RUN apt-get update && apt-get install -y \
  libglib2.0-dev \
  libexpat-dev \
  libpng-dev \
  libgif-dev \
  libexif-dev \
  liblcms2-dev \
  liborc-dev && rm -rf /var/lib/apt/lists/*

RUN wget ${VIPS_URL}/v${VIPS_VERSION}/vips-${VIPS_VERSION}.tar.gz \
  && tar xzf vips-${VIPS_VERSION}.tar.gz

# libvips is marked up for auto-vectorisation ... -O3 is the optimisation
# level that enables this for gcc
RUN cd vips-${VIPS_VERSION} \
  && CFLAGS=-O3 CXXFLAGS=-O3 ./configure \
  && make V=0 \
  && make install

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
