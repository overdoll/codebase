FROM jrottenberg/ffmpeg:4.4-ubuntu

RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*

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
