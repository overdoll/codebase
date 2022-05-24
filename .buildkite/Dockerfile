FROM gcr.io/bazel-public/ubuntu1804-java11@sha256:54af0180aaa595b2a10edce51e3ec71923b2e21c3964ffc0938c6f599f0b35e3

RUN apt update --allow-insecure-repositories
RUN yes | apt install ffmpeg
RUN curl --compressed -o- -L https://yarnpkg.com/install.sh | bash
RUN apt clean

RUN wget https://github.com/google/go-containerregistry/releases/download/v0.9.0/go-containerregistry_Linux_x86_64.tar.gz
RUN tar -xzf go-containerregistry_Linux_x86_64.tar.gz
RUN rm go-containerregistry_Linux_x86_64.tar.gz
RUN mv crane /bin

RUN apt install python3-yaml
RUN python3 -m pip install redis
