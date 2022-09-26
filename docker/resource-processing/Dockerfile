FROM jrottenberg/ffmpeg:4.4-ubuntu

# how to install mozjpeg + vips: https://github.com/jcupitt/docker-builds/blob/master/libvips-mozjpeg-ubuntu20.04/Dockerfile

ENV DEBIAN_FRONTEND=noninteractive
ENV LD_LIBRARY_PATH $LD_LIBRARY_PATH:/usr/local/lib
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

ENV SKIP_DOWNLOAD=true
ENV LIBWEBP_VERSION=1.1.0
ENV VENDOR_PATH=/.bin/bin

RUN wget https://storage.googleapis.com/downloads.webmproject.org/releases/webp/libwebp-1.1.0-linux-x86-64.tar.gz
RUN mkdir /.bin
RUN tar -xf libwebp-1.1.0-linux-x86-64.tar.gz
RUN mv libwebp-1.1.0-linux-x86-64/* /.bin
RUN rm libwebp-1.1.0-linux-x86-64.tar.gz
RUN rm -rf libwebp-1.1.0-linux-x86-64

RUN GRPC_HEALTH_PROBE_VERSION=v0.3.1 && \
    wget -qO/bin/grpc_health_probe https://github.com/grpc-ecosystem/grpc-health-probe/releases/download/${GRPC_HEALTH_PROBE_VERSION}/grpc_health_probe-linux-amd64 && \
    chmod +x /bin/grpc_health_probe
